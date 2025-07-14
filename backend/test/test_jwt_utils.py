import pytest
import jwt
import datetime
from rest_framework.exceptions import AuthenticationFailed
from django.test import RequestFactory
from api.utils import jwt_utils  # Ajusta el import si tu módulo está en otra ruta


@pytest.fixture
def user_id():
    return "user123"


@pytest.fixture
def token(user_id):
    return jwt_utils.generate_jwt(user_id)


def test_generate_jwt_contains_user_id(token, user_id):
    decoded = jwt.decode(token, jwt_utils.SECRET_KEY, algorithms=["HS256"])
    assert decoded["user_id"] == user_id
    assert "iat" in decoded
    assert "exp" in decoded


def test_verify_jwt_valid_token(token, user_id):
    factory = RequestFactory()
    request = factory.get('/')
    request.headers = {'Authorization': f'Bearer {token}'}

    result = jwt_utils.verify_jwt(request)
    assert result == user_id


def test_verify_jwt_missing_header():
    factory = RequestFactory()
    request = factory.get('/')
    request.headers = {}

    with pytest.raises(AuthenticationFailed) as exc_info:
        jwt_utils.verify_jwt(request)
    assert "Token no proporcionado" in str(exc_info.value)


def test_verify_jwt_invalid_token():
    factory = RequestFactory()
    request = factory.get('/')
    request.headers = {'Authorization': 'Bearer invalid.token.here'}

    with pytest.raises(AuthenticationFailed) as exc_info:
        jwt_utils.verify_jwt(request)
    assert "Token inválido" in str(exc_info.value)


def test_verify_jwt_expired_token(user_id, monkeypatch):
    # Creamos un token con expiración pasada
    expired_payload = {
        "user_id": user_id,
        "exp": datetime.datetime.utcnow() - datetime.timedelta(seconds=1),
        "iat": datetime.datetime.utcnow() - datetime.timedelta(days=1),
    }
    expired_token = jwt.encode(expired_payload, jwt_utils.SECRET_KEY, algorithm="HS256")

    factory = RequestFactory()
    request = factory.get('/')
    request.headers = {'Authorization': f'Bearer {expired_token}'}

    with pytest.raises(AuthenticationFailed) as exc_info:
        jwt_utils.verify_jwt(request)
    assert "Token expirado" in str(exc_info.value)
