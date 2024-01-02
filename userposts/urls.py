from django.urls import path
from .views import user_posts, get_user_posts


urlpatterns = [
    path('userposts/', user_posts, name='user_posts'),
    path('get-user-posts/', get_user_posts, name='get_user_posts'),
]