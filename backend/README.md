# ArchVision 3D AI - Backend Service

Servicio Backend REST API para la plataforma **ArchVision 3D AI**.

## Requisitos
- Node.js 18+

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor en modo desarrollo
npm run dev

# Iniciar servidor en modo producción
npm start
```

## Endpoints Principales

- `GET /api/v1/health` - Comprobación de estado del servicio.
- `POST /api/v1/chat` - Inferencia y respuestas del copiloto e auditoría espacial.
- `POST /api/v1/image-to-3d/generate` - Inferencia de reconstrucción geométrica 3D.
