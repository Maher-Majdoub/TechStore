# Generated by Django 5.0.1 on 2024-01-31 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0028_customer_email_customer_first_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
