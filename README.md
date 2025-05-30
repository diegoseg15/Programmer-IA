# Programmer IA

Plataforma Full Stack para la gestión de usuarios, procesamiento de datos y visualización, combinando:
- **Frontend**: Angular + Nginx
- **Backend**: Django + Gunicorn
- **Base de Datos**: MongoDB

Orquestado completamente con Docker y Docker Compose.

---

## 🚀 Requisitos Previos

- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose (incluido en Docker Desktop)

---

## 📦 Estructura del Proyecto

```

/programmer-ia
/frontend-angular
Dockerfile
/backend-django
Dockerfile
requirements.txt
docker-compose.yml

````

---

## ⚙️ Cómo levantar la plataforma

### 1. Construcción y despliegue

Desde la raíz del proyecto:

```bash
docker-compose up --build
````

> La primera vez puede tardar unos minutos.

### 2. Accesos

* **Frontend Angular (Nginx)**: [http://localhost:4200](http://localhost:4200)
* **Backend Django (Gunicorn)**: [http://localhost:8000](http://localhost:8000)
* **MongoDB**: `mongodb://localhost:27017/tu_base`

---

## 🛠️ Variables de Entorno

Configuradas en `docker-compose.yml`:

```yaml
environment:
  - DJANGO_SETTINGS_MODULE=mi_proyecto.settings
  - MONGO_URI=mongodb://mongo:27017/tu_base
```

> Recuerda actualizar `mi_proyecto` y `tu_base` según corresponda a tu proyecto.

---

## 🐳 Comandos útiles

* **Ver logs en tiempo real:**

  ```bash
  docker-compose logs -f
  ```

* **Detener los contenedores:**

  ```bash
  docker-compose down
  ```

* **Reconstruir desde cero:**

  ```bash
  docker-compose up --build --force-recreate
  ```

---

## ✅ Buenas prácticas

* **No uses SQLite en producción**, MongoDB ya está configurado.
* **Evita exponer MongoDB** públicamente en producción.
* **Ajusta nginx.conf** si usas rutas personalizadas en Angular.
* **Utiliza `.env`** para gestionar credenciales o configuraciones sensibles.

---

## 👨‍💻 Autor

Desarrollado por el equipo de **Programmer IA**.

---

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE) o la que corresponda.
