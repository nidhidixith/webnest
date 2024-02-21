from django.urls import path
from .views import signup, user_login
from .views import (complete_user_profile, success, get_user_profile,
                    get_basic_details, get_bio, get_external_links, get_interests,
                    edit_basic_details, edit_bio, edit_external_links, edit_interests,
                    get_basic_details_by_id,get_bio_by_id,get_external_links_by_id,get_interests_by_id,
                    follow_user,check_follow,followers_following_count,current_user_followers_following_count)

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', user_login, name='login'),
    path('userprofile/', complete_user_profile, name='userprofile-detail'),
    #path('displayprofile/', display_profile, name='display-profile'),

    path('get-profile/basic-details', get_basic_details, name='get-basic-details'),
    path('get-profile/bio', get_bio, name='get-bio'),
    path('get-profile/external-links', get_external_links, name='get-external-links'),
    path('get-profile/interests', get_interests, name='get-interests'),

    #path('editprofile/', edit_profile, name='edit-profile'),
    path('edit-profile/basic-details', edit_basic_details, name='edit-basic-details'),
    path('edit-profile/bio', edit_bio, name='edit-bio'),
    path('edit-profile/external-links', edit_external_links, name='edit-external-links'),
    path('edit-profile/interests', edit_interests, name='edit-interests'),

    path('getprofile/', get_user_profile, name='get-user-profile'),
    path('success/', success, name='success'),

    path('get-profile-by-id/basic-details/<int:user_id>/', get_basic_details_by_id, name='get-basic-details-by-id'),
    path('get-profile-by-id/bio/<int:user_id>/', get_bio_by_id, name='get-bio-by-id'),
    path('get-profile-by-id/external-links/<int:user_id>/', get_external_links_by_id, name='get-external-links-by-id'),
    path('get-profile-by-id/interests/<int:user_id>/', get_interests_by_id, name='get-interests-by-id'),

    path('follow/<int:user_id>/', follow_user, name='follow_user'),
    path('check-follow/<int:user_id>/', check_follow, name='check_follow'),
    path('followers-following-count/<int:user_id>/', followers_following_count, name='followers-following-count'),
    path('current-user-followers-following-count/', current_user_followers_following_count, name='current-user-followers-following-count'),

]