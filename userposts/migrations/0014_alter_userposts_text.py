# Generated by Django 4.2.6 on 2024-02-08 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userposts', '0013_comments_likes_remove_like_post_remove_like_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userposts',
            name='text',
            field=models.TextField(blank=True, max_length=5000),
        ),
    ]