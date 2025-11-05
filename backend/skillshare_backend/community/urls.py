from django.urls import path
from . import views
from .views import list_users, follow_unfollow_user, profile_view

from .models import Follow

urlpatterns = [
    path('explore/', list_users, name='explore-users'),
    path('follow/<int:user_id>/', follow_unfollow_user, name='follow-unfollow'),
    path('profile/', profile_view, name='profile'),

    path('profile/<int:user_id>/', views.public_profile_view, name='public-profile'),



]


