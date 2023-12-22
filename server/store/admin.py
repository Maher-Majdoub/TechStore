from django.contrib import admin
from django.contrib.admin import ModelAdmin as BaseModelAdmin, TabularInline as BaseTabularInline
from django.db.models import Q
from django.utils.html import format_html
from rangefilter.filters import NumericRangeFilter
from .models import Product, Category, Variation, ProductConfiguration, Discount, ProductImage


class ModelAdmin(BaseModelAdmin):
    def formfield_for_dbfield(self, *args, **kwargs):
        formfield = super().formfield_for_dbfield(*args, **kwargs)
        if formfield:
            formfield.widget.can_delete_related = False
            formfield.widget.can_change_related = False
            formfield.widget.can_add_related = False

        return formfield


class TabularInline(BaseTabularInline):
    def formfield_for_dbfield(self, *args, **kwargs):
        formfield = super().formfield_for_dbfield(*args, **kwargs)
        if formfield:
            formfield.widget.can_delete_related = False
            formfield.widget.can_change_related = False
            formfield.widget.can_add_related = False

        return formfield


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_select_related = ['parent_category']
    list_display = ['id', 'name', 'parent_category']
    list_editable = ['name', 'parent_category']
    list_select_related = ['parent_category']
    ordering = ['id']

    def save_model(self, request, obj: Category, form, change) -> None:
        if change:
            new_parent = obj.parent_category
            instance = Category.objects.get(id=obj.pk)
            if new_parent:
                if new_parent.pk == instance.pk: 
                    self.message_user(request, 'Parent category cannot be current.', level=40)
                    return
                if instance.parent_category and  new_parent.id != instance.parent_category.id or not instance.parent_category:
                    while True:
                        if not new_parent.parent_category: break
                        if new_parent.parent_category.id == instance.id:
                            self.message_user(request, 'Parent category cannot be this.', level=40)
                            return
                        new_parent = new_parent.parent_category 
        else:
            if obj.id == obj.parent_category.id:
                self.message_user(request, 'Parent category cannot be current.', level=40) # 40 for error
                return
        return super().save_model(request, obj, form, change)
    

@admin.register(Variation)
class VariationAdmin(ModelAdmin):
    list_display = ['id', 'category', 'name']
    list_editable = ['name']
    list_filter = ['category']

    def save_model(self, request, obj: Variation, form, change) -> None:
        if Variation.objects.filter(category = obj.category.pk, name__iexact=obj.name):
            self.message_user(request, 'Variation with same name already exists in this category.', level=40)
            return
        
        variation = Variation.objects.create(category_id=obj.category.pk, name=obj.name)

        products = Product.objects.filter(
            Q(category_id=obj.category.pk) | Q(category_id__parent_category_id=obj.category.pk))
        
        products_configurations = [
            ProductConfiguration(product=product, variation=variation, value=None)
            for product in products
        ]
        ProductConfiguration.objects.bulk_create(products_configurations)
        return variation
    
    
class ConfigurationInline(TabularInline):
    model = ProductConfiguration
    extra = 0

    def has_add_permission(self, request, obj=None) -> bool:
        return False
    
    def has_delete_permission(self, request, obj=None) -> bool:
        return False


class DiscountInline(TabularInline):
    model = Discount

    def save_model(self, request, obj, form, change):
        print('holla')
        super().save_model(request, obj, form, change)

class ImageInline(TabularInline):
    model = ProductImage
    readonly_fields = ['thumbnail']

    def thumbnail(self, instance):
        if instance.image:
            return format_html(f'<img src="{instance.image.url}" class="thumbnail"/>')
        
    class Media:
        css = {
            'all': ['store/style.css'],
        }

@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_per_page = 10
    list_filter = [
        'category',
        ('unit_price', NumericRangeFilter),
        ('inventory', NumericRangeFilter),
    ]
    inlines = [ConfigurationInline, DiscountInline, ImageInline]

    def save_model(self, request, obj: Product, form, change) -> None:
        if Category.objects.filter(parent_category_id=obj.category.pk).exists():
                self.message_user(request, 'Cannot add products to this category.', level=40)
                return
        
        if not change: 
            product = Product.objects.create(
                category = obj.category,
                name = obj.name,
                reference = obj.reference,
                description = obj.description,
                unit_price = obj.unit_price,
                inventory = obj.inventory
            )

            variations = Variation.objects.only('id').filter(
                Q(category_id=obj.category.pk) | Q(category_id=obj.category.parent_category.pk))

            configurations = [
                ProductConfiguration(product=product, variation=variation, value=None)
                for variation in variations
            ]

            ProductConfiguration.objects.bulk_create(configurations)
            return product
        else :
            if Product.objects.only('category_id').get(id=obj.pk).category_id != obj.category.pk:
                # category changed
                Product.objects.filter(id=obj.pk).update(
                    category = obj.category,
                    name = obj.name,
                    reference = obj.reference,
                    description = obj.description,
                    unit_price = obj.unit_price,
                    inventory = obj.inventory
                )
                ProductConfiguration.objects.filter(product_id=obj.pk).delete()
                variations = Variation.objects.only('id').filter(category=obj.category.id)
                configurations = [
                    ProductConfiguration(product_id=obj.pk, variation=variation, value=None)
                    for variation in variations
                ]
                ProductConfiguration.objects.bulk_create(configurations)
                return obj
        
        return super().save_model(request, obj, form, change)