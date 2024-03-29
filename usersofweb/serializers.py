from rest_framework import serializers
from .models import UserDetails
from .models import UserRelationships
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)
    areas_of_interest = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = UserDetails
        fields = ['username', 'first_name', 'last_name', 'date_of_birth', 'bio', 'instagram', 'facebook', 'portfolioLink',
                  'externalLink', 'areas_of_interest', 'profile_pic']


class BasicDetailsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = UserDetails
        fields = ['username', 'first_name', 'last_name', 'profile_pic']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # Adjust fields as needed

class UserRelationshipsSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)
    following = UserSerializer(read_only=True)

    class Meta:
        model = UserRelationships
        fields = ['id', 'follower', 'following', 'follower_count', 'following_count', 'created_at']


class BioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserDetails
        fields = ['username',  'bio']

class ExternalLinksSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = UserDetails
        fields = ['username', 'instagram', 'facebook', 'portfolioLink', 'externalLink', ]

class InterestsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    areas_of_interest = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = UserDetails
        fields = ['username', 'areas_of_interest']


class EditProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)
    areas_of_interest = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = UserDetails
        fields = ['username','first_name', 'last_name', 'bio', 'instagram', 'facebook', 'portfolioLink',
                  'externalLink', 'profile_pic', 'areas_of_interest']

class UserFullNameSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(use_url=True, required=False)
    user_id = serializers.ReadOnlyField(source='user.id')  # Adjust the source according to your model structure
    class Meta:
        model = UserDetails
        fields = ['user_id','first_name', 'last_name', 'profile_pic']

class FollowersListSerializer(serializers.ModelSerializer):
    follower_details = UserFullNameSerializer(source='follower.userdetails', read_only=True)
    user_id = serializers.ReadOnlyField(source='follower.id')


    class Meta:
        model = UserRelationships
        fields = ['user_id','follower', 'follower_details']

class FollowingListSerializer(serializers.ModelSerializer):
    following_details = UserFullNameSerializer(source='following.userdetails', read_only=True)
    user_id = serializers.ReadOnlyField(source='following.id')


    class Meta:
        model = UserRelationships
        fields = ['user_id','following', 'following_details']