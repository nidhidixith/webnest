from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import UserPosts, Likes, Comments
from .serializers import UserPostsSerializer, LikeSerializer, CommentSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    print("1")
    print(request.data)
    serializer = UserPostsSerializer(data=request.data, partial=True)
    print("2")
    print(serializer)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request):
    print("1")
    print(request.user)
    user_posts = UserPosts.objects.filter(user=request.user)
    print(user_posts)
    serializer = UserPostsSerializer(user_posts,many=True)
    print("2")
    print(serializer)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    post = UserPosts.objects.get(pk=post_id)
    like = Likes(user=request.user, post=post)
    like.save()
    return Response({'detail': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment_post(request, post_id):
    post = UserPosts.objects.get(pk=post_id)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def user_posts(request):
#     user = request.user
#     print(user)
#     user_post, created = UserPosts.objects.get_or_create(user=user)
#     print(request.data)
#     serializer = UserPostsSerializer(user_post, data=request.data, partial=True)
#     print(serializer)
#     # Validate and save the serializer
#     if serializer.is_valid():
#         print("Serializer data:", serializer.validated_data)
#         serializer.save()
#         print("Saved data:", serializer.data)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     else:
#         print(serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#


