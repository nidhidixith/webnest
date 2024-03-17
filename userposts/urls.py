from django.urls import path
from .views import (create_post,like_post,check_liked,add_comment,get_likes,get_comments,
                    get_user_posts,get_other_users_posts,get_other_users_posts_by_id,
                    repost_post, get_reposts, get_other_users_reposts, get_other_users_reposts_by_id)


urlpatterns = [
    path('create/', create_post, name='create_post'),
    path('get-user-posts/', get_user_posts, name='get_user_posts'),
    path('get-other-users-posts-by-id/<int:user_id>/', get_other_users_posts_by_id, name='get-other-users-posts-by-id'),
    path('get-other-users-posts/', get_other_users_posts, name='get_other_users_posts'),

    path('like/<int:post_id>/', like_post, name='like_post'),
    path('check-liked/<int:post_id>/', check_liked, name='check_liked'),
    path('get-likes/<int:post_id>/', get_likes, name='get_likes'),

    path('add-comment/<int:post_id>/', add_comment, name='add_comment'),
    path('get-comments/<int:post_id>/', get_comments, name='get_comments'),

    path('repost/', repost_post, name='repost_post'),
    path('get-reposts/', get_reposts, name='get_reposts'),
    path('get-other-users-reposts-by-id/<int:user_id>/', get_other_users_reposts_by_id, name='get-other-users-reposts-by-id'),
    path('get-other-users-reposts/', get_other_users_reposts, name='get_other_users_reposts'),
]