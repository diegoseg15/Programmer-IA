import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from unittest.mock import patch
from api.models import Message, MessageEntry

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user_token():
    # Devuelve un JWT simulado válido para pruebas
    return "Bearer fake-token"

@pytest.fixture
def valid_message_data():
    return {
        "userId": "user123",
        "model": "gpt-4o",
        "messages": [
            {"role": "user", "content": "Hola"},
            {"role": "assistant", "content": "Hola, ¿en qué puedo ayudarte?"}
        ]
    }

@pytest.mark.django_db
def test_save_message(api_client, valid_message_data):
    url = reverse('save_message')  # Asegúrate de que el name del path sea correcto
    response = api_client.post(url, data=valid_message_data, format='json')
    assert response.status_code == status.HTTP_200_OK
    assert 'id' in response.data

@pytest.mark.django_db
@patch('api.Views.chat_view.verify_jwt', return_value='user123')  # ajusta path según tu estructura
def test_get_messages(mock_verify, api_client, valid_message_data):
    # Crear mensaje antes de consultar
    message = Message.objects.create(
        userId='user123',
        model='gpt-4o',
        messages=[MessageEntry(role=m['role'], content=m['content']) for m in valid_message_data['messages']]
    )

    url = reverse('get_messages')
    api_client.credentials(HTTP_AUTHORIZATION='Bearer fake-token')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.data['messages']) >= 1

@pytest.mark.django_db
@patch('api.Views.chat_view.verify_jwt', return_value='user123')
def test_get_message_by_id(mock_verify, api_client, valid_message_data):
    message = Message.objects.create(
        userId='user123',
        model='gpt-4o',
        messages=[MessageEntry(**m) for m in valid_message_data['messages']]
    )

    url = reverse('get_message_by_id', kwargs={'id': str(message.id)})
    api_client.credentials(HTTP_AUTHORIZATION='Bearer fake-token')
    response = api_client.get(url)
    assert response.status_code == 200
    assert response.data['userId'] == 'user123'

@pytest.mark.django_db
@patch('api.Views.chat_view.verify_jwt', return_value='user123')
def test_update_message(mock_verify, api_client, valid_message_data):
    message = Message.objects.create(
        userId='user123',
        model='gpt-4o',
        messages=[MessageEntry(**m) for m in valid_message_data['messages']]
    )

    update_data = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": "¿Cuál es la capital de Francia?"}
        ]
    }

    url = reverse('update_message', kwargs={'id': str(message.id)})
    api_client.credentials(HTTP_AUTHORIZATION='Bearer fake-token')
    response = api_client.put(url, data=update_data, format='json')
    assert response.status_code == 200
    assert response.data['message'] == 'Mensaje actualizado correctamente'

@pytest.mark.django_db
@patch('api.Views.chat_view.verify_jwt', return_value='user123')
def test_delete_message(mock_verify, api_client, valid_message_data):
    message = Message.objects.create(
        userId='user123',
        model='gpt-4o',
        messages=[MessageEntry(**m) for m in valid_message_data['messages']]
    )

    url = reverse('delete-message', kwargs={'id': str(message.id)})
    api_client.credentials(HTTP_AUTHORIZATION='Bearer fake-token')
    response = api_client.delete(url)
    assert response.status_code == 200
    assert response.data['message'] == 'Mensaje eliminado correctamente'

# Pruebas de rendimiento test_chat



@pytest.mark.django_db
def test_benchmark_save_message(benchmark, api_client, valid_message_data):
    url = reverse('save_message')

    def do_post():
        api_client.post(url, data=valid_message_data, format='json')

    benchmark(do_post)


@pytest.mark.django_db
@patch('api.Views.chat_view.verify_jwt', return_value='user123')
def test_benchmark_get_messages(mock_verify, benchmark, api_client, valid_message_data):
    # Seed DB with at least one message
    Message.objects.create(
        userId='user123',
        model='gpt-4o',
        messages=[MessageEntry(**m) for m in valid_message_data['messages']]
    )
    api_client.credentials(HTTP_AUTHORIZATION='Bearer fake-token')
    url = reverse('get_messages')

    benchmark(lambda: api_client.get(url))


@pytest.mark.django_db
@patch('api.Views.chat_view.verify_jwt', return_value='user123')
def test_benchmark_update_message(mock_verify, benchmark, api_client, valid_message_data):
    # Crear mensaje que se actualizará
    message = Message.objects.create(
        userId='user123',
        model='gpt-4o',
        messages=[MessageEntry(**m) for m in valid_message_data['messages']]
    )
    url = reverse('update_message', kwargs={'id': str(message.id)})

    api_client.credentials(HTTP_AUTHORIZATION='Bearer fake-token')
    update_data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "¿Cuál es la capital de Francia?"}]
    }

    benchmark(lambda: api_client.put(url, data=update_data, format='json'))
