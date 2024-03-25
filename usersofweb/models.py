# models.py

from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.db import models
from PIL import Image


class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)

    instagram = models.URLField(max_length=200, blank=True)
    facebook = models.URLField(max_length=200, blank=True)
    portfolioLink = models.URLField(max_length=200, blank=True)
    externalLink = models.URLField(max_length=200, blank=True)

    areas_of_interest = ArrayField(models.CharField(max_length=100), blank=True, default=list)

    # Modify upload_to and default parameters
    profile_pic = models.ImageField(default='def.webp', upload_to='profile_pics', null=True, blank=True)


    def __str__(self):
        return f'{self.user.username} Profile'


    # def save(self):
    #     super().save()
    #
    #     img = Image.open(self.profile_pic.path)
    #
    #     if img.height > 300 or img.width > 300:
    #         output_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.profile_pic.path)


class UserRelationships(models.Model):
    follower = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    follower_count=models.IntegerField(default=0)
    following_count=models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)