from rest_framework import serializers
from .models import UserPost

class UserPostsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    media_file = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = UserPost
        fields = ['username', 'text', 'media_file']
