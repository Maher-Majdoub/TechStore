from rest_framework import serializers
from rest_framework.validators import ValidationError
from .models import *


class RecursiveSerializer(serializers.Serializer):
    # this class is used for models who have relation with the same model type
    def to_representation(self, value):
        serializer = self.parent.__class__(value, context=self.context, many=True)
        return serializer.data

# parent category tal3 ken lid 7awel sal7ha snn faskh el cmnt :)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category']

    def update(self, instance, validated_data): 
        new_parent= validated_data.get('parent_category')
        
        if new_parent:
            if new_parent.id == instance.id: 
                raise ValidationError({'error': 'parent is current.'})
            if instance.parent_category and  new_parent.id != instance.parent_category.id or not instance.parent_category:
                while True:
                    if not new_parent.parent_category: break
                    if new_parent.parent_category.id == instance.id:
                        raise ValidationError({'error': 'mrgl'})
                    new_parent = new_parent.parent_category 

        return super().update(instance, validated_data)
        
class GetCategorySerializer(CategorySerializer):
    sub_categories = RecursiveSerializer()
    class Meta(CategorySerializer.Meta):
        fields = ['id', 'name', 'sub_categories']
    

class VariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variation
        fields = ['id', 'name']

    def validate_name(self, name):
        category_id = self.context['category_id']
        if Category.objects.filter(parent_category=category_id).exists():
            raise ValidationError({'error': 'Cannot add Variation to this category.'})
        if Variation.objects.filter(category_id=category_id, name__iexact=name):
            raise ValidationError({'error': 'Variation already exists.'})
        return name

    def create(self, validated_data):
        category_id = self.context['category_id']
        variation = Variation.objects.create(category_id=category_id, **validated_data)

        products = Product.objects.filter(category_id=category_id)
        products_configurations = [
            ProductConfiguration(product=product, variation=variation, value=None)
            for product in products
        ]
        ProductConfiguration.objects.bulk_create(products_configurations)
        return variation
    

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'category', 
            'name', 
            'reference', 
            'description', 
            'unit_price', 
            'inventory'
        ]

    def create(self, validated_data):
        category_id = validated_data.get('category') or self.context.get('category_id')

        if Category.objects.filter(parent_category_id=category_id).exists():
            raise ValidationError({'Error': 'Cannot add products to this category.'})
        
        product = Product.objects.create(**validated_data, category_id=category_id)
        variations = Variation.objects.only('id').filter(category_id=category_id)

        configurations = [
            ProductConfiguration(product=product, variation=variation, value=None)
            for variation in variations
        ]

        ProductConfiguration.objects.bulk_create(configurations)

        return product
    
    def update(self, instance, validated_data):
        category_id = validated_data.get('category').id or self.context.get('category_id')
        if instance.category.id != category_id:
            if Category.objects.filter(parent_category_id=category_id).exists():
                raise ValidationError({'Error': 'Cannot add products to this category.'})

            Product.objects.filter(id=instance.id).update(**validated_data)
            ProductConfiguration.objects.filter(product_id=instance.id).delete()
            variations = Variation.objects.only('id').filter(category=category_id)
            configurations = [
                ProductConfiguration(product_id=instance.id, variation=variation, value=None)
                for variation in variations
            ]
            ProductConfiguration.objects.bulk_create(configurations)
            return instance
        
        return super().update(instance, validated_data)


class ProductConfigurationSerializer(serializers.ModelSerializer):
    variation = VariationSerializer(read_only=True)
    class Meta:
        model = ProductConfiguration
        fields = ['id', 'variation', 'value']

    def create(self, validated_data):
        return ProductConfiguration.objects.create(product_id=self.context['product_id'], **validated_data)

class GetProductConfigurationSerializer(ProductConfigurationSerializer):
    variation= serializers.CharField(source='variation.name', read_only=True)


class DiscountSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Discount
        fields = ['id', 'product', 'rate', 'start_date', 'end_date']


class ProductDiscountSerializer(DiscountSerializer):
    class Meta(DiscountSerializer.Meta):
        fields = ['id', 'rate', 'start_date', 'end_date']

    def create(self, validated_data):
        return Discount.objects.create(product_id=self.context['product_id'], **validated_data)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

    def create(self, validated_data):
        return ProductImage.objects.create(product_id=self.context['product_id'], **validated_data)


class GetProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    configurations = GetProductConfigurationSerializer(many=True)
    discounts = ProductDiscountSerializer(many=True)
    images = ProductImageSerializer(many=True)
    class Meta:
        model = Product
        fields = [
            'id',
            'category', 
            'name', 
            'reference', 
            'description', 
            'unit_price', 
            'inventory',
            'configurations',
            'discounts',
            'images',
        ]

class CategoryProductSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        fields = [
            'id',
            'name', 
            'reference', 
            'description', 
            'unit_price', 
            'inventory'
        ]

class GetCategoryProductSerializer(GetProductSerializer):
    class Meta(GetProductSerializer.Meta):
        fields = [
            'id',
            'name', 
            'reference', 
            'description', 
            'unit_price', 
            'inventory',
            'configurations',
            'discounts',
            'images',
        ]