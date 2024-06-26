# Generated by Django 5.0.1 on 2024-01-26 17:26

import store.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0019_productinfo_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productinfo',
            name='image',
            field=models.ImageField(upload_to='store/images/products/infos', validators=[store.validators.validate_file_size]),
        ),
    ]
