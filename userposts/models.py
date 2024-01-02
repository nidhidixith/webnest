from django.utils import timezone

from django.contrib.auth.models import User
from django.db import models
from PIL import Image

def upload_to(instance, filename):
    # Customize the upload path based on file type (photo or video)
    if filename.endswith('.jpg') or filename.endswith('.png') or filename.endswith('.jpeg') or filename.endswith('.webp'):
        return f'user_posts/photos/{filename}'
    elif filename.endswith('.mp4') or filename.endswith('.mov') or filename.endswith('.avi'):
        return f'user_posts/videos/{filename}'
    else:
        # Handle other file types or raise an error if not supported
        raise ValueError('Unsupported file type')


class UserPost(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=500, blank=True)
    media_file = models.FileField(upload_to=upload_to, null=True, blank=True)



