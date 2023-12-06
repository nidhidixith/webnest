from django.urls import path
from .views import signup, user_login
from .views import complete_user_profile,edit_profile, success,display_profile, get_user_profile

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', user_login, name='login'),
    path('userprofile/', complete_user_profile, name='userprofile-detail'),
    path('displayprofile/', display_profile, name='display-profile'),
    path('editprofile/', edit_profile, name='edit-profile'),
    path('getprofile/', get_user_profile, name='get-user-profile'),
    path('success/', success, name='success'),
]