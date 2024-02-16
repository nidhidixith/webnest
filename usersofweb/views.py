from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import (UserProfileSerializer, EditProfileSerializer, BasicDetailsSerializer,
                          BioSerializer,ExternalLinksSerializer,InterestsSerializer, UserConnectionSerializer)
from rest_framework.authtoken.models import Token
from .models import UserDetails,UserConnection


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Please provide username (email) and password'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if the user with the provided username (email) already exists
        if User.objects.filter(username=username).exists():
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = User.objects.create_user(username=username, password=password)

        # Authenticate the user
        auth_user = authenticate(request, username=username, password=password)

        if auth_user is not None:
            # Generate or retrieve the authentication token
            token, created = Token.objects.get_or_create(user=auth_user)

            # Log in the user
            login(request, auth_user)

            return Response({
                'message': 'User created and logged in successfully',
                'token': token.key,
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Authentication failed'}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({'error': f'Error creating user: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    auth_user = authenticate(request, username=username, password=password)

    if auth_user is not None:
        token, created = Token.objects.get_or_create(user=auth_user)
        login(request, auth_user)
        return Response({'message': 'Login successful', 'token': token.key} , status=200)
    else:
        return Response({'error': 'Invalid credentials'}, status=401)


@api_view(['GET'])
def success(request):
    return Response({'message': 'successful'}, status=200)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def complete_user_profile(request):
    user = request.user
    user_profile, created = UserDetails.objects.get_or_create(user=user)
    print("Requested data:")
    print(request.data)
    # Use the serializer to update the user profile fields
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
    print("Serializer is")
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_basic_details(request):
    print("Ok")
    if request.method == 'GET':
        print("Fine")
        user_profile = request.user.userdetails
        print("Almost there basic details")
        print(user_profile)
        serializer = BasicDetailsSerializer(user_profile)
        print("yayy")
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_basic_details_by_id(request, user_id):
    user_details = get_object_or_404(UserDetails, user__id=user_id)
    print(user_details)
    serializer = BasicDetailsSerializer(user_details)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bio(request):
    print("Ok")
    user_id = request.user.id
    print("UserID:", user_id)
    if request.method == 'GET':
        print("Fine")
        user_profile = request.user.userdetails
        print("Almost there bio")
        print(user_profile)
        serializer = BioSerializer(user_profile)
        print("yayy")
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_bio_by_id(request, user_id):
    user_details = get_object_or_404(UserDetails, user__id=user_id)
    print(user_details)
    serializer = BioSerializer(user_details)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_external_links(request):
    print("Ok")
    if request.method == 'GET':
        print("Fine")
        user_profile = request.user.userdetails
        print("Almost there")
        serializer = ExternalLinksSerializer(user_profile)
        print("yayy")
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_external_links_by_id(request, user_id):
    user_details = get_object_or_404(UserDetails, user__id=user_id)
    print(user_details)
    serializer = ExternalLinksSerializer(user_details)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_interests(request):
    print("Ok")
    if request.method == 'GET':
        print("Fine")
        user_profile = request.user.userdetails
        print("Almost there")
        serializer = InterestsSerializer(user_profile)
        print("yayy")
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_interests_by_id(request, user_id):
    user_details = get_object_or_404(UserDetails, user__id=user_id)
    print(user_details)
    serializer = InterestsSerializer(user_details)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user_profile = request.user.userdetails  # Assuming a one-to-one relationship between User and UserProfile
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_basic_details(request):
    user = request.user
    print(user)
    user_profile, created = UserDetails.objects.get_or_create(user=user)
    print(request.data)
    # Use the serializer to update the user profile fields
    serializer = BasicDetailsSerializer(user_profile, data=request.data, partial=True)
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_bio(request):
    user = request.user
    print(user)
    user_profile, created = UserDetails.objects.get_or_create(user=user)
    print(request.data)
    # Use the serializer to update the user profile fields
    serializer = BioSerializer(user_profile, data=request.data, partial=True)
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_external_links(request):
    user = request.user
    print(user)
    user_profile, created = UserDetails.objects.get_or_create(user=user)
    print(request.data)
    # Use the serializer to update the user profile fields
    serializer = ExternalLinksSerializer(user_profile, data=request.data, partial=True)
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_interests(request):
    user = request.user
    print(user)
    user_profile, created = UserDetails.objects.get_or_create(user=user)
    print(request.data)
    # Use the serializer to update the user profile fields
    serializer = InterestsSerializer(user_profile, data=request.data, partial=True)
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def follow_user(request, user_id):
#     try:
#         user_to_follow = UserDetails.objects.get(pk=user_id)
#
#         if request.user != user_to_follow.user:  # To prevent self-following
#             UserConnection.objects.get_or_create(follower=request.user, following=user_to_follow.user)
#
#             serializer = UserProfileSerializer(user_to_follow)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#
#         return Response({'error': 'Cannot follow yourself.'}, status=status.HTTP_400_BAD_REQUEST)
#
#     except UserDetails.DoesNotExist:
#         return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
#
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def unfollow_user(request, user_id):
#     try:
#         user_to_unfollow = UserDetails.objects.get(pk=user_id)
#         connection = UserConnection.objects.get(follower=request.user, following=user_to_unfollow.user)
#         connection.delete()
#
#         serializer = UserProfileSerializer(user_to_unfollow)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#
#     except (UserDetails.DoesNotExist, UserConnection.DoesNotExist):
#         return Response({'error': 'User not found or not being followed.'}, status=status.HTTP_404_NOT_FOUND)


