# Generated by Django 4.2.6 on 2024-03-22 05:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('userposts', '0017_comments_repost_likes_repost_alter_comments_post_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='repost',
            name='parent_repost',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userposts.repost'),
        ),
        migrations.AlterField(
            model_name='repost',
            name='original_post',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='userposts.userposts'),
        ),
    ]