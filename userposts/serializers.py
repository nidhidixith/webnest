from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserPosts, Likes, Comments
from usersofweb.serializers import UserFullNameSerializer

#from usersofweb.models import UserDetails


# class UserPostsSerializer(serializers.ModelSerializer):
#    username = serializers.CharField(source='user.username', read_only=True)
#    media_file = serializers.FileField(use_url=True, required=False)
#
#    class Meta:
#        model = UserPosts
#        fields = ['username', 'text', 'media_file']

class LikeSerializer(serializers.ModelSerializer):
    user_details = UserFullNameSerializer(source='user.userdetails', read_only=True)

    class Meta:
        model = Likes
        fields = ['user_details']

class CommentSerializer(serializers.ModelSerializer):
    user_details = UserFullNameSerializer(source='user.userdetails', read_only=True)
    class Meta:
        model = Comments
        fields = ['user_details','text','created_at']

class UserPostsSerializer(serializers.ModelSerializer):
    #likes = LikeSerializer(many=True, read_only=True)
    #comments = CommentSerializer(many=True, read_only=True)
    #username = serializers.CharField(source='user.username', read_only=True)
    user_details = UserFullNameSerializer(source='user.userdetails', read_only=True)
    media_file = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = UserPosts
        fields = ['id','user_details','text', 'media_file','created_at']