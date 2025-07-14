from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema
from ..serializers import RegisterSerializer, LoginSerializer
from ..models import User
from ..utils.jwt_utils import generate_jwt, verify_jwt
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
        data = request.data

        if User.objects(username=data['email']).first():
            return Response({'error': 'Usuario ya existe'}, status=400)

        hashed_password = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt()).decode()

        user = User(username=data['email'], password=hashed_password, names=data['names'], lastnames=data['lastnames'])
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
        data = request.data

        user = User.objects(username=data['email']).first()  # usamos `username` como campo interno

        if user and bcrypt.checkpw(data['password'].encode(), user.password.encode()):
            token = generate_jwt(str(user.id))
            return Response({'message': 'Login correcto', 'token': token})

        return Response({'error': 'Credenciales inválidas'}, status=401)
    
class GetUserActiveView(APIView):
    @extend_schema(
        responses={200: dict},
        description="Obtener los datos del usuario autenticado",
        tags=['Auth'],
        operation_id='get_user_auth',
        summary='Obtener información del usuario'
    )
    def get(self, request):
        user_id = verify_jwt(request)

        user = User.objects(id=user_id).first()  # Obtener un solo objeto

        if not user:
            return Response({'error': 'Usuario no encontrado'}, status=404)

        data = {
            'id': str(user.id),
            'names': user.names,
            'lastnames': user.lastnames,
            'email': user.username
        }

        return Response({'message': data})
