from typing import Any
from django.contrib import admin
from django.db.models.query import QuerySet
from django.http.request import HttpRequest
from rangefilter.filters import NumericRangeFilter
from . import models

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'parent_category']
    list_editable = ['name', 'parent_category']
    list_select_related = ['parent_category']
    ordering = ['id']

    def save_model(self, request: Any, obj: Any, form: Any, change: Any) -> None:
        if obj.id == obj.parent_category.id:
            self.message_user(request, 'Parent category cannot be current.', level=40) # 40 for error
            return
        return super().save_model(request, obj, form, change)
    
@admin.register(models.Variation)
class VariationAdmin(admin.ModelAdmin):
    list_display = ['id', 'category', 'name']
    list_editable = ['name']

    def save_model(self, request: Any, obj: Any, form: Any, change: Any) -> None:
        if models.Variation.objects.filter(category = obj.category.id, name__iexact=obj.name):
            self.message_user(request, 'Variation with same name already exists in this category.', level=40)
            return
        return super().save_model(request, obj, form, change)
    

@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'id', 
        'name',
    ] 
    list_per_page = 10
    list_filter = [
        'category',
        ('unit_price', NumericRangeFilter),
        ('inventory', NumericRangeFilter),
    ]