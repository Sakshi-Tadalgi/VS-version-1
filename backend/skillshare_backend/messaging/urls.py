from django.urls import path
from . import views

urlpatterns = [
    path("messages/threads/", views.get_threads, name="get_threads"),
    path("messages/<int:thread_id>/", views.get_messages, name="get_messages"),
    path("send_message/", views.send_message, name="send_message"),
    path("start_chat/", views.start_private_chat, name="start_private_chat"),
    path("users/", views.get_chat_users, name="get_chat_users"), 
    path('conversations/', views.get_conversations, name='get_conversations'),  # Add this line
]
