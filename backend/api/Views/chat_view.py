from rest_framework.views import APIView
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from ..serializers import SaveMessageSerializer, SaveMessageAISerializer
from ..models import Message, MessageEntry
from rest_framework import status
from bson import ObjectId
import requests
import json
import os
from dotenv import load_dotenv
from ..utils.jwt_utils import verify_jwt


load_dotenv()

OPENAI_SECRET_KEY = os.getenv("OPENAI_SECRET_KEY")
DEEPSEEK_SECRET_KEY = os.getenv("DEEPSEEK_SECRET_KEY")
GEMINI_SECRET_KEY=os.getenv("GEMINI_SECRET_KEY")


class ChatView(APIView):
    @extend_schema(
        request=SaveMessageAISerializer,
        responses={200: dict},
        description="Enviar un mensaje a OpenAI o DeepSeek según el modelo especificado.",
        tags=['Messages'],
        operation_id='chat_with_model',
        summary='Enviar mensaje a modelo de IA'
    )
    def post(self, request):
        url_openai = 'https://api.openai.com/v1/chat/completions'
        url_deepseek = 'https://api.deepseek.com/chat/completions'
        url_gemini = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'

        headers_openai = {
            'Authorization': f'Bearer {OPENAI_SECRET_KEY}',
            'Content-Type': 'application/json'
        }

        headers_deepseek = {
            'Authorization': f'Bearer {DEEPSEEK_SECRET_KEY}',
            'Content-Type': 'application/json'
        }

        headers_gemini = {
            'Authorization': f'Bearer {GEMINI_SECRET_KEY}',
            'Content-Type': 'application/json'
        }

        data = request.data

        try:
            model = data.get("model", "")
            if model in ['gpt-4o', 'o4-mini', 'o3-mini', 'gpt-3.5-turbo']:
                response = requests.post(url_openai, headers=headers_openai, json=data)
                return Response(response.json(), status=response.status_code)
            elif model == 'deepseek-chat':
                response = requests.post(url_deepseek, headers=headers_deepseek, json=data)
                return Response(response.json(), status=response.status_code)
            elif model == 'gemini-2.0-flash':
                response = requests.post(url_gemini, headers=headers_gemini, json=data)
                return Response(response.json(), status=response.status_code)
            else:
                return Response({'error': 'Modelo no reconocido.'}, status=400)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

class SaveMessageView(APIView):
    @extend_schema(
        request=SaveMessageSerializer,
        responses={200: dict},
        description="Guarda una conversación entre usuario y sistema",
        tags=['Messages'],
        operation_id='save_message',
        summary='Guardar mensajes recientes',
    )
    def post(self, request):
        try:
            data = request.data  # ✅ más seguro y limpio

            user_id = data.get("userId")
            model = data.get("model", "gpt-4o")
            raw_messages = data.get("messages", [])

            if not user_id or not isinstance(raw_messages, list):
                return Response({'error': 'Faltan campos requeridos'}, status=400)

            message_entries = [MessageEntry(role=m["role"], content=m["content"]) for m in raw_messages]

            message = Message(userId=user_id, model=model, messages=message_entries)
            message.save()

            return Response({'message': 'Mensaje guardado', 'id': str(message.id)})

        except Exception as e:
            return Response({'error': str(e)}, status=500)

class GetMessagesView(APIView):
    @extend_schema(
        responses={200: dict},
        description="Obtener los mensajes del usuario autenticado",
        tags=['Messages'],
        operation_id='get_message',
        summary='Obtener mensajes recientes del usuario'
    )
    def get(self, request):
        user_id = verify_jwt(request)

        messages = Message.objects(userId=user_id).order_by('-id')[:20]

        data = [{
            "id": str(m.id),
            'userId': m.userId,
            'model': m.model,
            'messages': [{'role': entry.role, 'content': entry.content} for entry in m.messages]
        } for m in messages]

        return Response({'messages': data})
    
class GetMessageByIdView(APIView):
    @extend_schema(
        responses={200: dict},
        description="Obtiene un mensaje por su ID, solo si pertenece al usuario autenticado.",
        tags=['Messages'],
        operation_id='get_message_by_id',
        summary='Obtener mensaje por ID (protegido)'
    )
    def get(self, request, id):
        try:
            user_id = verify_jwt(request)

            if not ObjectId.is_valid(id):
                return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)

            message = Message.objects(id=id).first()
            if not message:
                return Response({'error': 'Mensaje no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            if message.userId != user_id:
                return Response({'error': 'No tienes permiso para ver este mensaje'}, status=status.HTTP_403_FORBIDDEN)

            data = {
                'id': str(message.id),
                'userId': message.userId,
                'model': message.model,
                'messages': [{'role': m.role, 'content': m.content} for m in message.messages]
            }
            return Response(data)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

class UpdateMessageView(APIView):
    @extend_schema(
        request=SaveMessageSerializer,
        responses={
            200: dict,
            401: dict,
            400: dict,
            403: dict,
            404: dict,
            500: dict
        },
        description="Actualiza un mensaje existente. Solo el propietario puede modificarlo.",
        tags=['Messages'],
        operation_id='update_message',
        summary='Actualizar mensaje existente'
    )
    def put(self, request, id):
        try:
            # Verificar el token JWT
            try:
                user_id = verify_jwt(request)
            except Exception as e:
                return Response(
                    {'error': 'Token inválido o faltante', 'details': str(e)},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            data = request.data

            # Validar el ID
            if not ObjectId.is_valid(id):
                return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)

            # Buscar el mensaje
            message = Message.objects(id=id).first()
            if not message:
                return Response({'error': 'Mensaje no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            # Verificar que el usuario es el propietario
            if message.userId != user_id:
                return Response(
                    {'error': 'No tienes permiso para actualizar este mensaje'},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Validar datos de entrada
            model = data.get("model", message.model)
            raw_messages = data.get("messages", [])

            if not isinstance(raw_messages, list):
                return Response({'error': 'El campo messages debe ser una lista'}, status=400)

            # Actualizar el mensaje
            message.model = model
            message.messages = [MessageEntry(role=m["role"], content=m["content"]) for m in raw_messages]
            message.save()

            return Response({
                'message': 'Mensaje actualizado correctamente',
                'id': str(message.id)
            })

        except Exception as e:
            return Response(
                {'error': 'Error interno del servidor', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DeleteMessageView(APIView):
    @extend_schema(
        responses={
            200: dict,
            401: dict,
            400: dict,
            403: dict,
            404: dict,
            500: dict
        },
        description="Elimina un mensaje existente. Solo el propietario puede eliminarlo.",
        tags=['Messages'],
        operation_id='delete_message',
        summary='Eliminar mensaje existente'
    )
    def delete(self, request, id):
        try:
            try:
                user_id = verify_jwt(request)
            except Exception as e:
                return Response(
                    {'error': 'Token inválido o faltante', 'details': str(e)},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            if not ObjectId.is_valid(id):
                return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)

            message = Message.objects(id=id).first()
            if not message:
                return Response({'error': 'Mensaje no encontrado'}, status=status.HTTP_404_NOT_FOUND)

            if message.userId != user_id:
                return Response(
                    {'error': 'No tienes permiso para eliminar este mensaje'},
                    status=status.HTTP_403_FORBIDDEN
                )

            message.delete()

            return Response({
                'message': 'Mensaje eliminado correctamente',
                'id': id
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': 'Error interno del servidor', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )