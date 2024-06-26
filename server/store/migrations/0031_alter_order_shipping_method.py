# Generated by Django 5.0.4 on 2024-04-28 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0030_remove_customer_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='shipping_method',
            field=models.CharField(choices=[('SS', 'Standard Shipping'), ('FS', 'Free Shipping'), ('PS', 'Pickup In-Store')], default='SS', max_length=2),
        ),
    ]
