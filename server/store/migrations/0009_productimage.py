# Generated by Django 4.2.7 on 2023-11-19 20:34

from django.db import migrations, models
import django.db.models.deletion
import store.validators


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_delete_productimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='store/images/products', validators=[store.validators.validate_file_size])),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='store.product')),
            ],
        ),
    ]
