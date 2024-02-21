from django.contrib import admin

# Register your models here.
from .models import UserDetails
from .models import UserRelationships

admin.site.register(UserDetails)
admin.site.register(UserRelationships)