# Generated by Django 4.2.6 on 2023-12-02 07:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usersofweb', '0003_userprofile_firstname_userprofile_lastname_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='firstname',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='lastname',
            new_name='last_name',
        ),
    ]
