from django.db import models

# Create your models here.
from mongoengine import Document, StringField, ListField, EmbeddedDocument, EmbeddedDocumentField
from rest_framework import serializers
from datetime import datetime

class User(Document):
    names = StringField(required=True)
    lastnames = StringField(required=True)
    username = StringField(required=True, unique=True)
    password = StringField(required=True)

class MessageEntry(EmbeddedDocument):
    role = StringField(required=True)
    content = StringField(required=True)

class Message(Document):
    userId = StringField(required=True)
    model = StringField(default="gpt-4o")
    messages = ListField(EmbeddedDocumentField(MessageEntry))
