# api/serializers.py
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(help_text="Correo electrónico usado para iniciar sesión")
    password = serializers.CharField(help_text="Contraseña")

class RegisterSerializer(serializers.Serializer):
    names = serializers.CharField(help_text="Nombres del usuario")
    lastnames = serializers.CharField(help_text="Apellidos del usuario")
    email = serializers.EmailField(help_text="Correo electrónico")
    password = serializers.CharField(help_text="Contraseña")

class MessageEntrySerializer(serializers.Serializer):
    role = serializers.CharField()
    content = serializers.CharField()

class SaveMessageSerializer(serializers.Serializer):
    userId = serializers.CharField()
    model = serializers.CharField(default="gpt-4o")
    messages = MessageEntrySerializer(many=True)

class MessageAIEntrySerializer(serializers.Serializer):
    role = serializers.CharField()
    content = serializers.CharField()

class SaveMessageAISerializer(serializers.Serializer):
    model = serializers.CharField(default="gpt-4o")
    messages = MessageEntrySerializer(many=True)
