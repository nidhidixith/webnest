# Generated by Django 4.2.6 on 2023-12-12 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userposts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userposts',
            name='media_file',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics'),
        ),
    ]