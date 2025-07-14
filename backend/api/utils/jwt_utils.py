import jwt
import os
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
import datetime

SECRET_KEY = os.getenv("JWT_SECRET", "super-secret-key")

def verify_jwt(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise AuthenticationFailed('Token no proporcionado')

    token = auth_header.split(' ')[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Token expirado')
    except jwt.InvalidTokenError as e:
        raise AuthenticationFailed(f'Token inválido: {str(e)}')

    return payload['user_id']

def generate_jwt(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')