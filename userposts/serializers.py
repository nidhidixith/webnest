from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserPosts, Likes, Comments, Repost
from usersofweb.serializers import UserFullNameSerializer

#from usersofweb.models import UserDetails


class UserPostsSerializer(serializers.ModelSerializer):
    #likes = LikeSerializer(many=True, read_only=True)
    #comments = CommentSerializer(many=True, read_only=True)
    #username = serializers.CharField(source='user.username', read_only=True)
    user_details = UserFullNameSerializer(source='user.userdetails', read_only=True)
    media_file = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = UserPosts
        fields = ['id','user_details','text', 'media_file','created_at']

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

class RepostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repost
        fields = ['id', 'original_post', 'parent_repost', 'text']

class GetRepostSerializer(serializers.ModelSerializer):
    user_details = UserFullNameSerializer(source='user.userdetails', read_only=True)
    original_post_details = UserPostsSerializer(source='original_post', read_only=True)  # Adjust this line


    class Meta:
        model = Repost
        fields = ['id','user_details','original_post_details', 'parent_repost','text','created_at']

