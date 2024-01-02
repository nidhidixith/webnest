from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'link', 'bio', 'date_of_birth', 'profile_pic']


class EditProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'link', 'bio', 'date_of_birth', 'profile_pic']
