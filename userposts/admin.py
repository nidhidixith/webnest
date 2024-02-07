from django.contrib import admin
from .models import UserPosts,Likes,Comments

# Register your models here.
admin.site.register(UserPosts)
admin.site.register(Likes)
admin.site.register(Comments)