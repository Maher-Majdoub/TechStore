# Generated by Django 4.2.7 on 2023-11-13 12:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='parent_caategory',
            new_name='parent_category',
        ),
    ]
