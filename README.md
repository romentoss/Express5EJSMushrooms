# API Setas Comestibles

API REST para gestionar un catálogo de setas comestibles, tóxicas y venenosas. Incluye una interfaz web con EJS y documentación Swagger.

## Tecnologías

- **Express 5** - Framework web
- **EJS** - Motor de plantillas
- **Swagger UI** - Documentación interactiva de la API
- **pnpm** - Gestor de paquetes

## Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo (con reload automático)
pnpm dev

# Ejecutar en producción
pnpm start
```

## Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/setas` | Listar todas las setas (soporta filtros: `?nombre=&categoria=`) |
| GET | `/api/setas/:id` | Obtener una seta por ID |
| POST | `/api/setas` | Crear una nueva seta |
| PUT | `/api/setas/:id` | Actualizar una seta |
| DELETE | `/api/setas/:id` | Eliminar una seta |

## Rutas Web

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/setas` | Catálogo visual de setas |
| `/setas/:id` | Detalle de una seta |
| `/api/docs` | Documentación Swagger |

## Variables de entorno

No se requieren variables de entorno para desarrollo local.

## Imágenes

Las imágenes de las setas se cargan dinámicamente desde la API de Wikipedia utilizando el nombre científico de cada seta.

## License

MIT