# Generated by Django 4.2.6 on 2024-02-22 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userposts', '0014_alter_userposts_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='likes',
            name='like_count',
            field=models.IntegerField(default=0),
        ),
    ]