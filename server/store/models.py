from collections.abc import Iterable
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from rest_framework.exceptions import ValidationError
from uuid import uuid4
from .validators import validate_file_size

class Category(models.Model):
    parent_category = models.ForeignKey('self', on_delete=models.CASCADE, default=None, null=True, blank=True, related_name='sub_categories')
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ['id']

    def __str__(self) -> str:
        return self.name



class Variation(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='variations')
    name = models.CharField(max_length=255)
    
    class Meta:
        unique_together = ['category', 'name']


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='products')
    name = models.CharField(max_length=255, unique=True)
    reference = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)])
    inventory = models.IntegerField(validators=[MinValueValidator(0)])

    def __str__(self) -> str:
        return self.name


class ProductConfiguration(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='configurations')
    variation = models.ForeignKey(Variation, on_delete=models.PROTECT)
    value = models.CharField(max_length=255, null=True)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='store/images/products', validators=[validate_file_size])


class Discount(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='discounts')
    rate = models.DecimalField(max_digits=3, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    class Meta:
        constraints = [
            models.CheckConstraint(
                check = models.Q(start_date__lt = models.F('end_date')),
                name = 'End date should be after start date.',
            ),
        ]

    def save(self, *args, **kwargs):
        if self.start_date >= self.end_date:
            raise ValidationError({'Error': 'End date should be after start date.'})
        return super().save(*args, **kwargs)


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    date_create = models.DateTimeField(auto_now=True)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.SmallIntegerField(validators=[MinValueValidator(1)])


class Customer(models.Model):
    MEMBERSHIP_CHOICES = [
        ('B', 'Bronze'),
        ('S', 'Silver'),
        ('G', 'Gold')
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    phone = models.CharField(max_length=255, null=True)
    birth_date = models.DateField(null=True)
    membership = models.CharField(max_length=1, choices=MEMBERSHIP_CHOICES, default=MEMBERSHIP_CHOICES[0][0])


class Adress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name= 'adresses')
    is_default = models.BooleanField(default=False)
    state = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    region = models.CharField(max_length=255)
    street_number = models.CharField(max_length=255)
    postal_code = models.SmallIntegerField()
    description = models.TextField(null=True)

    def __str__(self) -> str:
        return self.state + ' ' + self.city + self.region + ' ' + self.street_number


class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('PE', 'Pending'), 
        ('PR', 'Processing'), 
        ('S', 'Shiped'),
        ('OFD', 'Out For Delivery'), 
        ('C', 'Cancelled'), 
        ('R', 'Returned'), 
        ('F', 'Failed'), 
        ('AP', 'Awaiting Payment'),
    ]
    PAYMENT_METHOD_CHOICES = [
        ('COD', 'Cash On Dilevery'), 
        ('CC', 'Credit Cart'), 
        ('PP', 'PayPal'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('P', 'Pending'), 
        ('C', 'Confirmed'), 
        ('D', 'Declined')
    ]
    SHIPING_METHOD_CHOICES = [
        ('SS', 'Standart Shipping'), 
        ('FS', 'Free Shipping'), 
        ('PS', 'Pickup In-Store')
    ]

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=3, choices=ORDER_STATUS_CHOICES, default=ORDER_STATUS_CHOICES[0][0])
    payment_method = models.CharField(max_length=3, choices=PAYMENT_METHOD_CHOICES, default=PAYMENT_METHOD_CHOICES[0][0])
    payment_status = models.CharField(max_length=1, choices=PAYMENT_STATUS_CHOICES, default=PAYMENT_STATUS_CHOICES[0][0])
    shipping_adress = models.ForeignKey(Adress, on_delete=models.PROTECT)
    shipping_method = models.CharField(max_length=2, choices=SHIPING_METHOD_CHOICES, default=SHIPING_METHOD_CHOICES[0][0])

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    discount = models.DecimalField(max_digits=3, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(0.99)])
    final_unit_price = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)])
    quantity = models.IntegerField(validators=[MinValueValidator(0)])

class Wish(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)

class Compare(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)