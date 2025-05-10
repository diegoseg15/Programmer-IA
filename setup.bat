@echo off
set ACTION=%1

if "%ACTION%"=="install" (
    echo 🔧 Instalando dependencias de Angular y Django...

    echo 📦 Instalando dependencias de Angular...
    cd frontend
    npm install
    cd ..

    echo 📦 Instalando dependencias de Django...
    cd backend/backend
    pip install -r requirements.txt
    cd ..

    echo ✅ Instalación completa.
    goto end
)

if "%ACTION%"=="start" (
    echo 🚀 Levantando los servicios...
    docker-compose up --build -d
    echo ✅ Plataforma en ejecución. Visita http://localhost:4200
)

if "%ACTION%"=="stop" (
    echo 🛑 Deteniendo los servicios...
    docker-compose down
    echo ✅ Servicios detenidos.
    goto end
)

echo Uso: setup.bat {install|start|stop}

:end
pause
