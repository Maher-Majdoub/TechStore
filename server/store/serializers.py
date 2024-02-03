from django.utils import timezone
from django.db import transaction
from rest_framework import serializers
from rest_framework.validators import ValidationError
from .models import (
    Category, Variation, ProductConfiguration, Discount, 
    ProductImage, Product,CartItem, Cart, Address, 
    Customer, OrderItem, Order, Compare, Wish, ProductTag, Tag,
    ProductInfo
)
from .tasks import notify_customer


class RecursiveSerializer(serializers.Serializer):
    # this class is used for models who have relation with the same model type
    def to_representation(self, value):
        serializer = self.parent.__class__(value, context=self.context, many=True)
        return serializer.data
        

class CategorySerializer(serializers.ModelSerializer):
    sub_categories = RecursiveSerializer()
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'thumbnail', 'sub_categories']
    
class SimpleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class SimpleSubCategorySerializer(SimpleCategorySerializer):
    parent_category = SimpleCategorySerializer()
    class Meta(SimpleCategorySerializer.Meta):
        fields = ['id', 'name', 'slug', 'parent_category']

class VariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variation
        fields = ['id', 'name']


class ProductConfigurationSerializer(serializers.ModelSerializer):
    variation = serializers.CharField(source='variation.name',)
    class Meta:
        model = ProductConfiguration
        fields = ['id', 'variation', 'value']


class ProductDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'rate', 'start_date', 'end_date']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class ProductInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInfo
        fields = ['id', 'title', 'description', 'image']

class ProductSerializer(serializers.ModelSerializer):
    category = SimpleSubCategorySerializer()
    configurations = ProductConfigurationSerializer(many=True)
    discounts = ProductDiscountSerializer(many=True)
    images = ProductImageSerializer(many=True)
    infos = ProductInfoSerializer(many=True)
    class Meta:
        model = Product
        fields = [
            'id',
            'category', 
            'name', 
            'slug',
            'reference', 
            'description', 
            'unit_price', 
            'inventory',
            'configurations',
            'discounts',
            'images',
            'infos'
        ]


class SimpleProductSerializer(ProductSerializer):
    class Meta(ProductSerializer.Meta):
        fields = [
            'id',
            'name', 
            'slug',
            'reference', 
            'description', 
            'unit_price', 
        ]


class TagSerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True)
    class Meta:
        model = Tag
        fields = ['id', 'name']


class ProductTagSerializer(serializers.ModelSerializer):
    tag = TagSerializer()
    product = ProductSerializer()
    class Meta:
        model = ProductTag
        fields = ['id', 'tag', 'product']
        

class DiscountSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Discount
        fields = ['id', 'product', 'rate', 'start_date', 'end_date']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

    def create(self, validated_data):
        cart_id = self.context['cart_id']
        #check if the product exists in the cart
        response = CartItem.objects.filter(cart=cart_id, product_id=validated_data['product'])
        if response.exists():
            cart_item: CartItem = response[0]
            cart_item.quantity += validated_data['quantity']
            cart_item.save()
            return cart_item
        return CartItem.objects.create(cart_id=cart_id, **validated_data)


class GetCartItemSerializer(CartItemSerializer):
    product = ProductSerializer()


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = GetCartItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'items']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = [
            'id',
            'first_name',
            'last_name',
            'company',
            'phone_number',
            'address',
            'country',
            'state',
            'city',
            'region',
            'street_number',
            'postal_code',
            'description',
            'is_default_billing_address',
            'is_default_shipping_address'
        ]

    def create(self, validated_data):
        if validated_data['is_default_billing_address']:
            Address.objects.filter(customer=self.context['customer_id']).update(is_default_billing_address=False)
        if validated_data['is_default_shipping_address']:
            Address.objects.filter(customer=self.context['customer_id']).update(is_default_shipping_address=False)
        return Address.objects.create(customer=self.context['customer_id'], **validated_data)
    
    def update(self, instance, validated_data):
        if validated_data.get('is_default_billing_address'):
            Address.objects.filter(customer=self.context['customer_id']).update(is_default_billing_address=False)
        if validated_data.get('is_default_shipping_address'):
            Address.objects.filter(customer=self.context['customer_id']).update(is_default_shipping_address=False)
        return super().update(instance, validated_data)


class OrderItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = [
            'id',
            'order',
            'product',
            'discount',
            'final_unit_price',
            'quantity',
        ]


class GetOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    shipping_address = AddressSerializer()
    billing_address = AddressSerializer()
    total = serializers.SerializerMethodField()

    def get_total(self, obj: Order):
        total = 0
        items = OrderItem.objects.filter(order=obj)
        for item in items: total += item.final_unit_price * item.quantity
        return total


    class Meta:
        model = Order
        fields = [
            'id', 
            'created_at',
            'status',
            'payment_method',
            'payment_status',
            'billing_address',
            'shipping_address',
            'shipping_method',
            'total',
            'items',
        ]


class WishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wish
        fields = ['id', 'product', 'created_at']
        
    def validate_product(self, product_id):
        wish = Wish.objects.filter(customer_id=self.context['customer_id'], product_id=product_id)
        if wish.exists(): raise ValidationError({'error': 'Product already in the wishlist.'})
        return product_id

    def create(self, validated_data):
        return Wish.objects.create(customer_id=self.context['customer_id'], **validated_data)


class GetWishSerializer(WishSerializer):
    product = ProductSerializer()


class CompareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compare
        fields = ['id', 'product', 'created_at']

    def validate_product(self, product_id):
        compare = Compare.objects.filter(customer_id=self.context['customer_id'], product_id=product_id)
        if compare.exists(): raise ValidationError({'error': 'Product already in the comparelist.'})
        return product_id
    
    def create(self, validated_data):
        return Compare.objects.create(customer_id=self.context['customer_id'], **validated_data)


class GetCompareSerializer(CompareSerializer):
    product = ProductSerializer()


class CustomerSerializer(serializers.ModelSerializer):
    membership = serializers.CharField(read_only=True)
    addresses = AddressSerializer(many=True, read_only=True)
    wish_list = GetWishSerializer(many=True, read_only=True)
    compare_list = GetCompareSerializer(many=True, read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'first_name',
            'last_name',
            'phone', 
            'birth_date', 
            'membership', 
            'addresses',
            'wish_list',
            'compare_list'
        ]


class OrderSerializer(serializers.ModelSerializer):
    cart_id = serializers.UUIDField()

    class Meta(GetOrderSerializer.Meta):
        model= Order
        fields = [
            'cart_id',
            'billing_address',
            'payment_method',
            'shipping_address',
            'shipping_method'
        ]

    def validate_cart_id(self, cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise ValidationError(
                {'error': 'No cart with the given ID was found.'}
            )
        if not CartItem.objects.filter(cart_id=cart_id).exists():
            raise ValidationError(
                {'error', 'The cart is empty.'}
            )
        return cart_id

    @transaction.atomic
    def save(self, **kwargs):
        cart_id = self.validated_data['cart_id']
        customer_id = self.context['customer'].id
        payment_method = self.validated_data['payment_method']
        billing_address = self.validated_data['billing_address']
        shipping_address = self.validated_data['shipping_address']
        shipping_method = self.validated_data['shipping_method']

        order = Order.objects.create(
            customer_id = customer_id,
            payment_method = payment_method,
            billing_address = billing_address,
            shipping_address = shipping_address,
            shipping_method = shipping_method,
        )

        cart_items = CartItem.objects.filter(cart_id=cart_id).select_related('product')
        order_items = []

        total_price = 0

        for item in cart_items:
            discounts = Discount.objects.only('rate').filter(
                product = item.product,
                start_date__lt = timezone.now(),
                end_date__gt = timezone.now(),
            )

            discount = 0
            if discounts.exists():
                discount = discounts[0] # | discounts | = 0 or 1 no more

            final_unit_price = item.product.unit_price * (1 - discount)
            total_price += final_unit_price * item.quantity

            order_item = OrderItem(
                order = order,
                product = item.product,
                discount = discount,
                final_unit_price = final_unit_price,
                quantity = item.quantity
            )

            order_items.append(order_item)
        
        OrderItem.objects.bulk_create(order_items)
        Cart.objects.get(pk=cart_id).delete()

        # notify_customer.delay(
        #     user = UserSerializer(self.context['user']).data,
        #     customer = CustomerSerializer(self.context['customer']).data,
        #     order = GetOrderSerializer(order).data,
        #     total_price = total_price,
        #     order_items = [OrderItemSerializer(order_item).data for order_item in order_items],
        #     #billing adress
        #     shipping_address = AddressSerializer(order.shipping_address).data,
        #     email = self.context['user'].email
        # )
        
        return order