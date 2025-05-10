#!/bin/bash

ACTION=$1

case $ACTION in
  install)
    echo "🔧 Instalando dependencias de Angular y Django..."

    echo "📦 Instalando dependencias de Angular..."
    cd frontend
    npm install
    cd ..

    echo "📦 Instalando dependencias de Django..."
    cd backend/backend
    pip install -r requirements.txt
    cd ..

    echo "✅ Instalación completa."
    ;;

  start)
    echo "🚀 Levantando los servicios..."
    docker-compose up --build -d
    echo "✅ Plataforma en ejecución. Visita http://localhost:4200"
    ;;

  stop)
    echo "🛑 Deteniendo los servicios..."
    docker-compose down
    echo "✅ Servicios detenidos."
    ;;

  *)
    echo "Uso: ./delpoy.sh {install|start|stop}"
    ;;
esac
