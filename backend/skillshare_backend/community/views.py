from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Follow
from django.shortcuts import get_object_or_404

from .serializers import UserExploreSerializer
from django.contrib.auth.models import User

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    """List all users except the logged-in one, and show follow status"""
    current_user = request.user
    users = User.objects.exclude(id=current_user.id)
    serializer = UserExploreSerializer(users, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_unfollow_user(request, user_id):
    """Toggle follow/unfollow"""
    current_user = request.user

    if current_user.id == user_id:
        return Response({'error': "You can't follow yourself"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        target_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    follow_obj = Follow.objects.filter(follower=current_user, following=target_user)

    if follow_obj.exists():
        follow_obj.delete()
        return Response({'message': 'Unfollowed successfully', 'is_following': False})
    else:
        Follow.objects.create(follower=current_user, following=target_user)
        return Response({'message': 'Followed successfully', 'is_following': True})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followers_list(request):
    """List all followers of current user"""
    followers = Follow.objects.filter(following=request.user).select_related('follower')
    data = [{'id': f.follower.id, 'username': f.follower.username} for f in followers]
    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def following_list(request):
    """List all users the current user is following"""
    following = Follow.objects.filter(follower=request.user).select_related('following')
    data = [{'id': f.following.id, 'username': f.following.username} for f in following]
    return Response(data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    followers = Follow.objects.filter(following=user).select_related('follower')
    following = Follow.objects.filter(follower=user).select_related('following')

    data = {
        'id': user.id,
        'username': user.username,
        'bio': getattr(user, 'bio', ''),
        'expertise': getattr(user, 'expertise', ''),
        'followers': [{'id': f.follower.id, 'username': f.follower.username} for f in followers],
        'following': [{'id': f.following.id, 'username': f.following.username} for f in following],
    }
    return Response(data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def public_profile_view(request, user_id):
    user = get_object_or_404(User, id=user_id)
    followers = Follow.objects.filter(following=user).select_related('follower')
    following = Follow.objects.filter(follower=user).select_related('following')

    data = {
        'id': user.id,
        'username': user.username,
        'bio': getattr(user, 'bio', ''),
        'expertise': getattr(user, 'expertise', ''),
        'followers': [{'id': f.follower.id, 'username': f.follower.username} for f in followers],
        'following': [{'id': f.following.id, 'username': f.following.username} for f in following],
    }
    return Response(data)


