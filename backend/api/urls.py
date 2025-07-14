from django.urls import path
from .Views.chat_view import ChatView, SaveMessageView, GetMessagesView, GetMessageByIdView, UpdateMessageView, DeleteMessageView
from .Views.auth_views import LoginView, RegisterView, GetUserActiveView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='chat'),
    path('save-message/', SaveMessageView.as_view(), name='save_message'),
    path('messages/', GetMessagesView.as_view(), name='get_messages'),
    path('message/<str:id>/', GetMessageByIdView.as_view(), name='get_message_by_id'),
    path('message/update/<str:id>/', UpdateMessageView.as_view(), name='update_message'),
    path('delete-message/<str:id>/', DeleteMessageView.as_view(), name='delete-message'),

    path('login/', LoginView.as_view(), name='login_user'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user_auth/', GetUserActiveView.as_view(), name='get_user_auth')
]
