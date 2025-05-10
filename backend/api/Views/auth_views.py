from rest_framework.views import APIView
from rest_framework.response import Response

class LoginView(APIView):
    def post(self, request):
        # Lógica real de login
        return Response({'message': 'Login OK'})

class RegisterView(APIView):
    def post(self, request):
        # Lógica real de registro
        return Response({'message': 'Register OK'})
