from django.contrib.auth.models import User
from django.db import models
from PIL import Image

def upload_to(instance, filename):
    if instance.media_file:
        # Customize the upload path based on file type (photo or video)
        if filename.endswith(('.jpg', '.png', '.jpeg', '.webp')):
            return f'user_posts/photos/{filename}'
        elif filename.endswith(('.mp4', '.mov', '.avi')):
            return f'user_posts/videos/{filename}'
        else:
            # Raise an error for unsupported file types
            raise ValueError('Unsupported file type')
    else:
        # If media_file is not provided, handle accordingly (e.g., store in a generic folder)
        return None


class UserPosts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=5000, blank=True)
    media_file = models.FileField(upload_to=upload_to, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.id}"

    # def like_count(self):
    #     return Likes.objects.filter(post=self).count()

# class Repost(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     original_post = models.ForeignKey(UserPosts, on_delete=models.CASCADE)
#     text = models.TextField(max_length=500, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)

class Repost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    original_post = models.ForeignKey(UserPosts, on_delete=models.CASCADE, null=True, related_name='reposts')
    parent_repost = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='child_reposts')
    text = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_original_post(self):
        if self.parent_repost:
            return self.parent_repost.get_original_post()
        else:
            return self.original_post

    def __str__(self):
        return f"{self.user.username} - {self.original_post.id}"


class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(UserPosts, on_delete=models.CASCADE, null=True)
    repost = models.ForeignKey(Repost, on_delete=models.CASCADE, null=True)
    like_count=models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)


class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(UserPosts, on_delete=models.CASCADE, null=True)
    repost = models.ForeignKey(Repost, on_delete=models.CASCADE, null=True)
    text = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)



