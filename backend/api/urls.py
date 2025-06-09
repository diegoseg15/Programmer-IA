from django.urls import path
from .Views.chat_view import ChatView, SaveMessageView, GetMessagesView, GetMessageByIdView
from .Views.auth_views import LoginView, RegisterView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='chat'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('save-message/', SaveMessageView.as_view(), name='save_message'),
    path('messages/', GetMessagesView.as_view(), name='get_messages'),
    path('message/<str:id>/', GetMessageByIdView.as_view(), name='get_message_by_id'),
]
