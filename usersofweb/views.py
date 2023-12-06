from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer, EditProfileSerializer
from rest_framework.authtoken.models import Token
from .models import UserProfile
from django.http import JsonResponse


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Please provide username, password, and Email ID'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if the user with the provided username or email already exists
        if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
            return Response({'error': 'Username or email already exists'}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = User.objects.create_user(username=username, password=password, email=email)

        # Authenticate the user
        auth_user = authenticate(request, username=username, password=password)

        if auth_user is not None:
            # Generate or retrieve the authentication token
            token, created = Token.objects.get_or_create(user=auth_user)

            # Log in the user
            login(request, auth_user)

            # Get the URL for the UserProfileForm view
            #profile_form_url = reverse('userprofile')  # Make sure this matches the URL name in your urls.py

            return Response({
                'message': 'User created and logged in successfully','token': token.key,
                #'redirect_to': profile_form_url
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def display_profile(request):
    print("Ok")
    if request.method == 'GET':
        print("Fine")
        user_profile = request.user.userprofile
        print("Almost there")
        serializer = UserProfileSerializer(user_profile)
        print("yayy")
        return Response(serializer.data)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def complete_user_profile(request):
    user = request.user
    user_profile, created = UserProfile.objects.get_or_create(user=user)
    print(request.data)
    # Use the serializer to update the user profile fields
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    # user = request.user
    # form_data = request.data
    # #print(user)
    # #print(form_data)
    # # Create or update the user profile
    # user_profile, created = UserProfile.objects.get_or_create(user=user)
    # #print("OK")
    # # Update the user profile fields
    # user_profile.first_name = form_data.get('first_name', user_profile.first_name)
    # user_profile.last_name = form_data.get('last_name', user_profile.last_name)
    # user_profile.link = form_data.get('link', user_profile.link)
    # user_profile.bio = form_data.get('bio', user_profile.bio)
    # user_profile.date_of_birth = form_data.get('date_of_birth', user_profile.date_of_birth)
    # user_profile.profile_pic = form_data.get('profile_pic', user_profile.profile_pic)
    # print("Fine")
    # # Save the user profile
    # serialized_data = {
    #     'username': user.username,
    #     'email': user.email,
    #     'first_name': user_profile.first_name,
    #     'last_name': user_profile.last_name,
    #     'link': user_profile.link,
    #     'bio': user_profile.bio,
    #     'date_of_birth': user_profile.date_of_birth,
    #     'profile_pic': user_profile.profile_pic,
    # }
    # user_profile.save()
    # print("Done")
    # # Serialize the user profile data
    # serializer = UserProfileSerializer(data=serialized_data)
    # print("0")
    # serializer.is_valid()
    # print("1")
    # print(serializer.data)
    # print("There you go")
    # return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user_profile = request.user.userprofile  # Assuming a one-to-one relationship between User and UserProfile
    serializer = UserProfileSerializer(user_profile)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user
    print(user)
    user_profile, created = UserProfile.objects.get_or_create(user=user)
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



# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def complete_user_profile(request):
#     user = request.user
#     form_data = request.data
#     #print(user)
#     #print(form_data)
#     # Create or update the user profile
#     user_profile, created = UserProfile.objects.get_or_create(user=user)
#     #print("OK")
#     # Update the user profile fields
#     user_profile.first_name = form_data.get('first_name', user_profile.first_name)
#     user_profile.last_name = form_data.get('last_name', user_profile.last_name)
#     user_profile.link = form_data.get('link', user_profile.link)
#     user_profile.bio = form_data.get('bio', user_profile.bio)
#     user_profile.date_of_birth = form_data.get('date_of_birth', user_profile.date_of_birth)
#     user_profile.profile_pic = form_data.get('profile_pic', user_profile.profile_pic)
#     #print("Fine")
#     # Save the user profile
#     user_profile.save()
#     #print("Done")
#     # Serialize the user profile data
#     serializer = UserProfileSerializer(user_profile)
#     #print(serializer.data)
#     #print("There you go")
#     return Response(serializer.data, status=status.HTTP_200_OK)



# @api_view(['GET', 'PUT'])
# @permission_classes([IsAuthenticated])
# def user_profile_detail(request):
#     print("User")
#     print(request.user)
#     try:
#         user_profile = UserProfile.objects.get(user=request.user)
#         print("Try"+user_profile)
#     except UserProfile.DoesNotExist:
#         print("Error")
#         return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = UserProfileSerializer(user_profile)
#         print("GET")
#         return Response(serializer.data)
#
#     elif request.method == 'PUT':
#         serializer = UserProfileSerializer(user_profile, data=request.data)
#         print("PUT IF")
#         if serializer.is_valid():
#             serializer.save()
#             print("PUT IF")
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# @api_view(['POST'])
# @permission_classes([AllowAny])
# def signup(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     email = request.data.get('email')
#
#     if not username or not password or not email:
#         return Response({'error': 'Please provide username, password and Email ID'}, status=400)
#
#     user = User.objects.create_user(username=username, password=password, email=email)
#     response_data = {
#                        'message': 'User created successfully',
#                         #'redirect_to': '/complete_profile'
#                     }
#     return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
#
#     #print("Signup successful")
#     #user = authenticate(username=username, password=password)
#
#     # if user:
#     #     login(request, user)
#     #     token, created = Token.objects.get_or_create(user=user)
#     #     response_data = {
#     #         'message': 'User created successfully',
#     #         'token': token.key,  # Include the token in the response
#     #         'redirect_to': '/complete_profile'
#     #     }
#     #     return Response(response_data, status=200)
#     # else:
#     #     return Response({'error': 'Authentication failed'}, status=400)