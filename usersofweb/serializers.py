from rest_framework import serializers
from .models import UserDetails

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)
    areas_of_interest = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = UserDetails
        fields = ['username', 'first_name', 'last_name', 'date_of_birth', 'bio', 'instagram', 'facebook', 'portfolioLink',
                  'externalLink', 'areas_of_interest', 'profile_pic']


class EditProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = UserDetails
        fields = ['username', 'first_name', 'last_name', 'date_of_birth', 'bio', 'instagram', 'facebook', 'portfolioLink',
                  'externalLink', 'profile_pic']

class UserFullNameSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(use_url=True, required=False)
    class Meta:
        model = UserDetails
        fields = ['first_name', 'last_name', 'profile_pic']