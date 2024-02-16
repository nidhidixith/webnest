from django.urls import path
from .views import create_post,like_post,comment_post,get_user_posts,get_other_users_posts


urlpatterns = [
    path('create/', create_post, name='create_post'),
    path('get-other-users-posts/', get_other_users_posts, name='get_other_users_posts'),
    path('like/<int:post_id>/', like_post, name='like_post'),
    path('comment/<int:post_id>/', comment_post, name='comment_post'),
    path('get-user-posts/', get_user_posts, name='get_user_posts'),
]