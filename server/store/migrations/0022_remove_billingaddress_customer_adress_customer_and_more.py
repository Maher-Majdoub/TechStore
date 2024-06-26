# Generated by Django 5.0.1 on 2024-01-30 17:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0021_remove_adress_customer_remove_adress_is_default_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='billingaddress',
            name='customer',
        ),
        migrations.AddField(
            model_name='adress',
            name='customer',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='billing_addresses', to='store.customer'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='adress',
            name='is_default_billing_address',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='adress',
            name='is_default_shipping_address',
            field=models.BooleanField(default=False),
        ),
    ]
