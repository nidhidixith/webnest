# Generated by Django 4.2.6 on 2023-12-12 10:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userposts', '0005_alter_userposts_media_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='userposts',
            name='user',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
