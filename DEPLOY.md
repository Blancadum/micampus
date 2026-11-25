# Guía de Despliegue en Producción (MiCampus)

## 1. Backend Spring Boot (`Dockerfile`)
El backend gestiona usuarios, sesiones (`HttpOnly`), SQLite (`micampus-data/micampus.db`), IA y envío de correos.

### Variables de entorno recomendadas
```bash
# Puerto del servidor (por defecto 8090)
SERVER_PORT=8090
MICAMPUS_AUTO_OPEN_BROWSER=false

# Secreto fijo para firmar cookies de sesión (evita cerrar sesiones al reiniciar)
MICAMPUS_SESSION_SECRET=pon-aqui-una-clave-larga-y-aleatoria

# CORS y cookies si el frontend está en otro dominio (ej. https://tu-usuario.github.io)
MICAMPUS_CORS_ORIGINS=https://tu-usuario.github.io
MICAMPUS_COOKIE_SECURE=true
MICAMPUS_COOKIE_SAME_SITE=None

# Opcional: SMTP para enviar códigos de recuperación de contraseña por correo
MICAMPUS_SMTP_HOST=smtp.gmail.com
MICAMPUS_SMTP_PORT=587
MICAMPUS_SMTP_USER=tu-correo@gmail.com
MICAMPUS_SMTP_PASSWORD=tu-app-password
```

### Volumen persistente
Monta un disco persistente en `/app/micampus-data` para conservar `micampus.db` (usuarios, lecciones, tareas y configuración) entre despliegues.

```bash
docker build -t micampus .
docker run -d -p 8090:8090 \
  -v micampus_data:/app/micampus-data \
  -e MICAMPUS_SESSION_SECRET="cambia-esta-clave" \
  micampus
```

## 2. Frontend en GitHub Pages (`github.io`)
El workflow `.github/workflows/deploy-pages.yml` compila `frontend/` y publica `src/main/resources/static` automáticamente en GitHub Pages al hacer push a `main`.

> **Importante:** En GitHub Pages (Settings → Pages → Source), selecciona **GitHub Actions**. Además, regístrate tú primero en cuanto levantes el servidor para que tu cuenta reciba el rol `admin`.
