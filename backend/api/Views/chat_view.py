from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
import requests

class ChatView(APIView):
    def post(self, request):
       
        urlOpenAI = 'https://api.openai.com/v1/chat/completions'
        headersOpenAI = {
            'Authorization': 'Bearer',
            'Content-Type': 'application/json'
        }

        urlDeepSeek = 'https://api.deepseek.ai/v1/chat/completions'
        headersDeepseek = {
            'Autorization': 'Bearer',
            'Content-Type': 'application/json'
        }

        data = request.data

        try:
             if (request.data['model'] == 'gpt-4o' or request.data['model']== 'gpt-3.5'):
                response = requests.post(urlOpenAI, headers=headersOpenAI, json=data)
                return Response(response.json(), status=response.status_code)
             else: 
                if(request.data['model'] == 'deepseek-chat'):
                    response = request.post(urlDeepSeek, headers=headersDeepseek, json=data)
                    return Response(response.json(), status=response.status_code)
                else:
                    return Response({'error': 'Modelo no reconocido.'}, status=400)
                 
        except Exception as e:
            return Response({'error': str(e)}, status=500)
