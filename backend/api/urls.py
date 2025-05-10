from django.urls import path
from .Views.chat_view import ChatView
from .Views.auth_views import LoginView, RegisterView

urlpatterns = [
    path('chat/', ChatView.as_view(), name='chat'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
]
