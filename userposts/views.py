from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserPostsSerializer
from .models import UserPost

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_posts(request):
    user = request.user
    print(user)
    user_post, created = UserPost.objects.get_or_create(user=user)
    print(request.data)
    serializer = UserPostsSerializer(user_post, data=request.data, partial=True)
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        print("Serializer data:", serializer.validated_data)
        serializer.save()
        print("Saved data:", serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request):
    user_post = request.user.userpost  # Assuming a one-to-one relationship between User and UserPost
    serializer = UserPostsSerializer(user_post)
    return Response(serializer.data)

