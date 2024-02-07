from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer, EditProfileSerializer
from rest_framework.authtoken.models import Token
from .models import UserDetails

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
def display_profile(request):
    print("Ok")
    if request.method == 'GET':
        print("Fine")
        user_profile = request.user.userdetails
        print("Almost there")
        serializer = UserProfileSerializer(user_profile)
        print("yayy")
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user_profile = request.user.userdetails  # Assuming a one-to-one relationship between User and UserProfile
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user
    print(user)
    user_profile, created = UserDetails.objects.get_or_create(user=user)
    print(request.data)
    # Use the serializer to update the user profile fields
    serializer = EditProfileSerializer(user_profile, data=request.data, partial=True)
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


