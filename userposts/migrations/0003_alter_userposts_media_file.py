# Generated by Django 4.2.6 on 2023-12-12 07:52

from django.db import migrations, models
import userposts.models


class Migration(migrations.Migration):

    dependencies = [
        ('userposts', '0002_alter_userposts_media_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userposts',
            name='media_file',
            field=models.FileField(blank=True, null=True, upload_to=userposts.models.upload_to),
        ),
    ]