from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from ..serializers import RegisterSerializer, LoginSerializer
from ..models import User
from ..utils.jwt_utils import generate_jwt
import json
import bcrypt

class RegisterView(APIView):
    @extend_schema(
        request=RegisterSerializer,
        responses={201: dict},
        tags=['Auth'],
        summary='Registrar nuevo usuario',
    )
    def post(self, request):
        data = json.loads(request.body)

        if User.objects(username=data['email']).first():
            return Response({'error': 'Usuario ya existe'}, status=400)

        hashed_password = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt()).decode()

        user = User(username=data['email'], password=hashed_password)
        user.save()

        return Response({'message': 'Usuario registrado correctamente'}, status=201)

class LoginView(APIView):
    @extend_schema(
        request=LoginSerializer,
        responses={200: dict},
        description="Inicia sesión con email y contraseña. Devuelve un token JWT si es válido.",
        tags=['Auth'],
        operation_id='login_user',
        summary='Iniciar sesión de usuario'
    )
    def post(self, request):
        data = json.loads(request.body)

        user = User.objects(username=data['email']).first()  # usamos `username` como campo interno

        if user and bcrypt.checkpw(data['password'].encode(), user.password.encode()):
            token = generate_jwt(str(user.id))
            return Response({'message': 'Login correcto', 'token': token})

        return Response({'error': 'Credenciales inválidas'}, status=401)