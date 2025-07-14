import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from api.models import User
import bcrypt
from unittest.mock import patch
from bson import ObjectId

from api.utils.jwt_utils import generate_jwt



@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user_data():
    return {
        "email": "test@example.com",
        "password": "secret123",
        "names": "John",
        "lastnames": "Doe"
    }

@pytest.mark.django_db
def test_register_user(api_client, user_data):
    url = reverse('register') 
    response = api_client.post(url, user_data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['message'] == 'Usuario registrado correctamente'
    assert User.objects(username=user_data['email']).count() == 1

@pytest.mark.django_db
def test_register_existing_user(api_client, user_data):
    if not User.objects(username=user_data['email']).first():
        hashed_pw = bcrypt.hashpw(user_data['password'].encode(), bcrypt.gensalt()).decode()
        User(username=user_data['email'], password=hashed_pw, names='John', lastnames='Doe').save()

    url = reverse('register')
    response = api_client.post(url, user_data, format='json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert 'error' in response.data

@pytest.mark.django_db
def test_login_success(api_client, user_data):
    hashed_pw = bcrypt.hashpw(user_data['password'].encode(), bcrypt.gensalt()).decode()
    User(username=user_data['email'], password=hashed_pw, names='John', lastnames='Doe').save()

    url = reverse('login_user') 
    credentials = {
        "email": user_data["email"],
        "password": user_data["password"]
    }

    response = api_client.post(url, credentials, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'token' in response.data

@pytest.mark.django_db
def test_login_failure(api_client, user_data):
    url = reverse('login_user')
    response = api_client.post(url, {
        "email": user_data['email'],
        "password": "wrongpass"
    }, format='json')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert 'error' in response.data

@pytest.mark.django_db
def test_get_user_authenticated_success(api_client):
    mocked_id = ObjectId()
    user = User(id=mocked_id, username='me@example.com', password='pw', names='Me', lastnames='Smith')
    user.save()

    with patch('api.Views.auth_views.verify_jwt', return_value=str(mocked_id)):
        url = reverse('get_user_auth')
        api_client.credentials(HTTP_AUTHORIZATION='Bearer fake-token')
        response = api_client.get(url)

    assert response.status_code == 200
    assert response.data['message']['email'] == 'me@example.com'

def test_get_user_not_found(api_client):
    mocked_id = ObjectId() 
    with patch('api.Views.auth_views.verify_jwt', return_value=str(mocked_id)):
        url = reverse('get_user_auth')
        api_client.credentials(HTTP_AUTHORIZATION='Bearer token')
        response = api_client.get(url)

    assert response.status_code == 404
    assert response.json()['error'] == 'Usuario no encontrado'

# Pruebas de Rendimiento test_auth
@pytest.mark.django_db
def test_benchmark_register_user(benchmark, api_client, user_data):
    url = reverse('register')

    def do_register():
        # Nos aseguramos de borrar el usuario si ya existe (por si se repite el benchmark)
        User.objects(username=user_data['email']).delete()
        api_client.post(url, user_data, format='json')

    benchmark(do_register)


@pytest.mark.django_db
def test_benchmark_login_user(benchmark, api_client, user_data):
    # Creamos usuario una vez fuera del benchmark
    hashed_pw = bcrypt.hashpw(user_data['password'].encode(), bcrypt.gensalt()).decode()
    User.objects(username=user_data['email']).delete()
    User(username=user_data['email'], password=hashed_pw, names='Bench', lastnames='Mark').save()

    url = reverse('login_user')
    credentials = {
        "email": user_data["email"],
        "password": user_data["password"]
    }

    def do_login():
        api_client.post(url, credentials, format='json')

    benchmark(do_login)