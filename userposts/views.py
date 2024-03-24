from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import UserPosts, Likes, Comments, Repost
from django.db.models import F, Sum
from .serializers import UserPostsSerializer, LikeSerializer, CommentSerializer, RepostSerializer, GetRepostSerializer

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


# Simplified like_post view
@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    content_type = request.GET.get('content_type')
    if content_type=='post':
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
    elif content_type=='repost':
        try:
            post = Repost.objects.get(id=post_id)
        except Repost.DoesNotExist:
            return Response({'detail': 'Post not found.'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'POST':
            like, created = Likes.objects.get_or_create(user=request.user, repost=post)
            if created:
                Likes.objects.filter(id=like.id).update(like_count=F('like_count') + 1)
                return Response({'detail': 'Post liked successfully.'}, status=status.HTTP_201_CREATED)

        elif request.method == 'DELETE':
            like = Likes.objects.filter(user=request.user, repost=post).first()
            if like:
                Likes.objects.filter(id=like.id).update(like_count=F('like_count') - 1)
                like.delete()
                return Response({'detail': 'Post unliked successfully.'}, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, post_id):
    content_type = request.GET.get('content_type')
    if content_type == 'post':
        post = UserPosts.objects.get(pk=post_id)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif content_type == 'repost':
        post = Repost.objects.get(pk=post_id)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, repost=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_liked(request, post_id):
    content_type = request.GET.get('content_type')  # Assuming it's passed as a query parameter
    print('Content Type:', content_type)
    print('i am in Check liked')
    try:
        if content_type=='post':
            post = UserPosts.objects.get(id=post_id)
            is_liked = Likes.objects.filter(user=request.user, post=post).exists()
            like_count = Likes.objects.filter(post=post).aggregate(Sum('like_count'))['like_count__sum']
        elif content_type=='repost':
            post = Repost.objects.get(id=post_id)
            is_liked = Likes.objects.filter(user=request.user, repost=post).exists()
            like_count = Likes.objects.filter(repost=post).aggregate(Sum('like_count'))['like_count__sum']

    except UserPosts.DoesNotExist:
        return Response({'detail': 'Post not found or content_type error.'}, status=status.HTTP_404_NOT_FOUND)


    return Response({'is_liked': is_liked, 'like_count': like_count})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_likes(request, post_id):
    content_type = request.GET.get('content_type')  # Assuming it's passed as a query parameter
    print('Content Type:', content_type)
    print('i am in get likes')
    try:
        if content_type == 'post':
            post = UserPosts.objects.get(id=post_id)
            likes = Likes.objects.filter(post=post)
            like_count = likes.count()
            if request.method == 'GET':
                serializer = LikeSerializer(likes, many=True)
                response_data = {
                    'likes': serializer.data,
                    'likes_count': like_count,
                }
                return Response(response_data)
        elif content_type == 'repost':
            post = Repost.objects.get(id=post_id)
            likes = Likes.objects.filter(repost=post)
            like_count = likes.count()
            if request.method == 'GET':
                serializer = LikeSerializer(likes, many=True)
                response_data = {
                    'likes': serializer.data,
                    'likes_count': like_count,
                }
                return Response(response_data)

    except UserPosts.DoesNotExist:
        return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)


    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request, post_id):
    content_type = request.GET.get('content_type')  # Assuming it's passed as a query parameter
    print('Content Type:', content_type)
    print('i am in get comments')
    try:
        if content_type == 'post':
            post = UserPosts.objects.get(id=post_id)
            comments = Comments.objects.filter(post=post)
            comment_count = comments.count()
            if request.method == 'GET':
                serializer = CommentSerializer(comments, many=True)
                response_data = {
                    'comments': serializer.data,
                    'comment_count': comment_count,
                }
                return Response(response_data)
        elif content_type == 'repost':
            post = Repost.objects.get(id=post_id)
            comments = Comments.objects.filter(repost=post)
            comment_count = comments.count()
            if request.method == 'GET':
                serializer = CommentSerializer(comments, many=True)
                response_data = {
                    'comments': serializer.data,
                    'comment_count': comment_count,
                }
                return Response(response_data)

    except UserPosts.DoesNotExist:
        return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_reposts_count(request, post_id):
    content_type = request.GET.get('content_type')  # Assuming it's passed as a query parameter
    print('Content Type:', content_type)
    print('i am in get reposts')
    if content_type=='post':
        try:
            post = UserPosts.objects.get(pk=post_id)
        except UserPosts.DoesNotExist:
            return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        reposts = Repost.objects.filter(original_post=post)
        reposts_count = reposts.count()
        if request.method == 'GET':
            response_data = {
                'reposts_count': reposts_count,
            }
            return Response(response_data)

    return Response(status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def repost_post(request):
#     print("1")
#     if request.method == 'POST':
#         print("2")
#         serializer = RepostSerializer(data=request.data, partial=True)
#         print("3")
#         print(serializer)
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return Response(serializer.data, status=201)
#         print(serializer.errors)
#         return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def repost_post(request):
    if request.method == 'POST':
        serializer = RepostSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            user = request.user
            original_post = serializer.validated_data['original_post']
            text = serializer.validated_data.get('text', '')

            # Function to recursively find the original post
            def get_original_post(post):
                if isinstance(post, Repost) and post.parent_repost:
                    return get_original_post(post.parent_repost)
                else:
                    return post

            original_post = get_original_post(original_post)

            # Create the Repost object
            repost = Repost.objects.create(user=user, original_post=original_post, text=text)
            repost.save()

            # Serialize the Repost object
            repost_serializer = RepostSerializer(repost)
            return Response(repost_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_reposts(request):
    print("1")
    print(request.user)
    reposts = Repost.objects.filter(user=request.user)
    print(reposts)
    serializer = GetRepostSerializer(reposts, many=True)
    print("2")
    print(serializer)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_users_reposts(request):
    # Fetch posts of other users excluding the logged-in user
    other_users_reposts = Repost.objects.exclude(user=request.user)
    serializer = GetRepostSerializer(other_users_reposts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_other_users_reposts_by_id(request, user_id):
    user_reposts = Repost.objects.filter(user__id=user_id)
    serializer = GetRepostSerializer(user_reposts, many=True)
    return Response(serializer.data)