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


class BasicDetailsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = UserDetails
        fields = ['username', 'first_name', 'last_name', 'profile_pic']

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
    class Meta:
        model = UserDetails
        fields = ['first_name', 'last_name', 'profile_pic']