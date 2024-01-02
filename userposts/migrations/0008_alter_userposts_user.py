# Generated by Django 4.2.6 on 2023-12-12 10:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userposts', '0007_alter_userposts_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userposts',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
