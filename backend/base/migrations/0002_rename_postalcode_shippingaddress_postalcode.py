# Generated by Django 3.2.13 on 2022-06-14 22:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='shippingaddress',
            old_name='postalCode',
            new_name='postalcode',
        ),
    ]
