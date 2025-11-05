from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
 
from .models import Chat, Message
from .serializers import MessageSerializer
from community.models import Follow
 
# ✅ Use custom user model
User = get_user_model()
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_users(request):
    """
    Returns users that the logged-in user follows or is followed by.
    """
    user = request.user
    following = Follow.objects.filter(follower=user).values_list("following", flat=True)
    followers = Follow.objects.filter(following=user).values_list("follower", flat=True)
 
    user_ids = set(list(following) + list(followers))
    users = User.objects.filter(id__in=user_ids).values("id", "username")
 
    return Response(list(users))
 
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat(request):
    """
    Create a chat between two users if it doesn't already exist.
    """
    user1 = request.user
    user2_id = request.data.get('user_id')
 
    if not user2_id:
        return Response({"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST)
 
    try:
        user2 = User.objects.get(id=user2_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
 
    if user1 == user2:
        return Response({"error": "Cannot create chat with yourself"}, status=status.HTTP_400_BAD_REQUEST)
 
    chat = Chat.objects.filter(user1=user1, user2=user2).first() or Chat.objects.filter(user1=user2, user2=user1).first()
    if not chat:
        chat = Chat.objects.create(user1=user1, user2=user2)
 
    return Response({"chat_id": chat.id})
 
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_private_chat(request):
    username = request.data.get('username')
    user_id = request.data.get('user_id')

    if not username and not user_id:
        return Response({"error": "username or user_id required"}, status=400)

    try:
        if username:
            other_user = User.objects.get(username=username)
        else:
            other_user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    if other_user == request.user:
        return Response({"error": "You cannot start a chat with yourself."}, status=400)

    chat, created = Chat.objects.get_or_create_between(request.user, other_user)
    return Response({"id": chat.id, "created": created}, status=201)

 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request, chat_id):
    """
    Retrieve all messages for a given chat.
    """
    chat = get_object_or_404(Chat, id=chat_id)
    messages = Message.objects.filter(chat=chat)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)
 
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(request):
    """
    Send a message in a chat.
    """
    chat_id = request.data.get('chat_id')
    content = request.data.get('content')
 
    if not chat_id or not content:
        return Response({'error': 'chat_id and content are required'}, status=status.HTTP_400_BAD_REQUEST)
 
    chat = get_object_or_404(Chat, id=chat_id)
    message = Message.objects.create(chat=chat, sender=request.user, content=content)
 
    serializer = MessageSerializer(message)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
 
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_threads(request):
    """
    Get all chat threads for the authenticated user.
    """
    user = request.user
    chats = Chat.objects.filter(user1=user) | Chat.objects.filter(user2=user)
    chats = chats.distinct()
 
    threads = []
    for chat in chats:
        last_msg = chat.messages.last()
        threads.append({
            "id": chat.id,
            "participants": [chat.user1.username, chat.user2.username],
            "last_message": last_msg.content if last_msg else "",
        })
 
    return Response({"threads": threads})
 
 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_conversations(request):
    """
    Fetch all conversations for the authenticated user.
    """
    user = request.user
    chats = Chat.objects.filter(user1=user) | Chat.objects.filter(user2=user)
    chats = chats.distinct()
 
    conversations = []
    for chat in chats:
        other_user = chat.user1 if chat.user1 != user else chat.user2
        conversations.append({
            "id": chat.id,
            "user": {
                "id": other_user.id,
                "username": other_user.username,
            }
        })
 
    return Response(conversations)
 
 