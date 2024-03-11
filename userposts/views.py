from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import UserPosts, Likes, Comments
from django.db.models import F, Sum
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_users_posts(request):
    # Fetch posts of other users excluding the logged-in user
    other_users_posts = UserPosts.objects.exclude(user=request.user)
    serializer = UserPostsSerializer(other_users_posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_other_users_posts_by_id(request, user_id):
    user_posts = UserPosts.objects.filter(user__id=user_id)
    serializer = UserPostsSerializer(user_posts, many=True)
    return Response(serializer.data)


# @api_view(['POST', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def like_post(request, post_id):
#     try:
#         post = UserPosts.objects.get(pk=post_id)
#     except UserPosts.DoesNotExist:
#         raise Http404("Post not found")
#
#     if request.method == 'POST':
#         # Increment like count and create a new like
#         post.like_count += 1
#         post.save()
#         like = Likes(user=request.user, post=post)
#         like.save()
#         return Response({'detail': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)
#     elif request.method == 'DELETE':
#         # Decrement like count and delete the like
#         post.like_count = max(0, post.like_count - 1)
#         post.save()
#         like = Likes.objects.filter(user=request.user, post=post).first()
#         if like:
#             like.delete()
#             return Response({'detail': 'Post unliked successfully.'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'detail': 'Like not found.'}, status=status.HTTP_404_NOT_FOUND)

# Simplified like_post view
@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    try:
        post = UserPosts.objects.get(id=post_id)
    except UserPosts.DoesNotExist:
        return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        like, created = Likes.objects.get_or_create(user=request.user, post=post)
        if created:
            Likes.objects.filter(id=like.id).update(like_count=F('like_count') + 1)
            return Response({'detail': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        like = Likes.objects.filter(user=request.user, post=post).first()
        if like:
            Likes.objects.filter(id=like.id).update(like_count=F('like_count') - 1)
            like.delete()
            return Response({'detail': 'Post unliked successfully.'}, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_204_NO_CONTENT)

# Consistent handling of like_count in check_liked view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_liked(request, post_id):
    try:
        post = UserPosts.objects.get(id=post_id)
    except UserPosts.DoesNotExist:
        return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

    is_liked = Likes.objects.filter(user=request.user, post=post).exists()
    like_count = Likes.objects.filter(post=post).aggregate(Sum('like_count'))['like_count__sum']

    return Response({'is_liked': is_liked, 'like_count': like_count})


# @api_view(['POST', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def like_post(request, post_id):
#     print("1")
#     print(request.user)
#     print(post_id)
#     post = UserPosts.objects.get(pk=post_id)
#     print("2")
#     print(post)
#     like = Likes(user=request.user, post=post)
#     print("3")
#     like.save()
#     return Response({'detail': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, post_id):
    #print("1")
    post = UserPosts.objects.get(pk=post_id)
    #print("2")
    #print(post)
    serializer = CommentSerializer(data=request.data)
    #print("3")
    #print(serializer)
    if serializer.is_valid():
        serializer.save(user=request.user, post=post)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    #print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_likes(request, post_id):
    try:
        post = UserPosts.objects.get(pk=post_id)

    except UserPosts.DoesNotExist:
        return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    likes = Likes.objects.filter(post=post)
    like_count = likes.count()
    if request.method == 'GET':
        serializer = LikeSerializer(likes, many=True)
        response_data = {
            'likes': serializer.data,
        }
        return Response(response_data)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request, post_id):
    try:
        post = UserPosts.objects.get(pk=post_id)

    except UserPosts.DoesNotExist:
        return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    comments = Comments.objects.filter(post=post)
    comment_count = comments.count()
    if request.method == 'GET':
        serializer = CommentSerializer(comments, many=True)
        response_data = {
            'comments': serializer.data,
            'comment_count': comment_count,
        }
        return Response(response_data)

    return Response(status=status.HTTP_400_BAD_REQUEST)



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


