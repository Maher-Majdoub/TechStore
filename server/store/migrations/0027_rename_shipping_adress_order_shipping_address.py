# Generated by Django 5.0.1 on 2024-01-30 19:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0026_address_order_billing_address_order_shipping_adress'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='shipping_adress',
            new_name='shipping_address',
        ),
    ]
