from django.contrib import admin
from django.contrib.admin import ModelAdmin, StackedInline
from django.http.request import HttpRequest
from .models import User
from rangefilter.filters import DateRangeFilter
from .forms import CustomUserChangeForm
from store.models import Customer


class CustomerInline(StackedInline):
    model = Customer


@admin.register(User)
class UserAdmin(ModelAdmin):
    form = CustomUserChangeForm
    inlines = [CustomerInline]
    list_per_page = 20
    list_filter = [
        'customer__membership',
        ('date_joined', DateRangeFilter),
        'is_superuser',
        'is_staff',
    ]

    def has_add_permission(self, request: HttpRequest) -> bool:
        return False
