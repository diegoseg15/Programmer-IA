from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Tu API real
    path('api/v1/', include('api.urls')),

    # OpenAPI JSON Schema (debe ser JSON para Swagger)
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Documentación Swagger
    path('api/v1/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # Documentación Redoc (opcional)
    path('api/v1/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
