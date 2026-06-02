# API Setas Comestibles

API REST para gestionar un catálogo de setas comestibles, tóxicas y venenosas. Incluye interfaz web con EJS y documentación Swagger interactiva.

## Stack Tecnológico

- **Express 5** - Framework web con nuevas características de rendimiento y manejo de errores
- **EJS** - Motor de plantillas para renderizado de vistas
- **Swagger UI** - Documentación interactiva de la API
- **pnpm** - Gestor de paquetes rápido y seguro
- **Wikipedia API** - Imágenes dinámicas desde Wikimedia Commons

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/romentoss/Express5EJSMushrooms.git
cd Express5EJSMushrooms

# Instalar dependencias con pnpm
pnpm install

# Ejecutar en desarrollo (con reload automático)
pnpm dev

# Ejecutar en producción
pnpm start
```

## Endpoints API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/setas` | Listar todas las setas |
| GET | `/api/setas/:id` | Obtener una seta por ID |
| POST | `/api/setas` | Crear una nueva seta |
| PUT | `/api/setas/:id` | Actualizar una seta |
| DELETE | `/api/setas/:id` | Eliminar una seta |
| GET | `/api/docs` | Documentación Swagger |

### Parámetros de consulta

- `?nombre=` - Filtrar por nombre (búsqueda parcial)
- `?categoria=` - Filtrar por categoría (domesticada, silvestre, tóxica)

## Rutas Web

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/setas` | Catálogo visual con filtros |
| `/setas/:id` | Detalle de una seta con imagen de Wikipedia |

## Novedades Express 5

Express 5 introduce cambios significativos respecto a Express 4. Aquí están las principales novedades:

### 1. Middlewares Asíncronos Automáticos

**Antes (Express 4):** Debías llamar manualmente `next(err)` en catch blocks.

```javascript
// Express 4
app.get('/ruta', (req, res, next) => {
  fetchData()
    .then(data => res.json(data))
    .catch(err => next(err));
});
```

**Ahora (Express 5):** Los errores en funciones async se capturan y pasan automáticamente.

```javascript
// Express 5
app.get('/ruta', async (req, res) => {
  const data = await fetchData();
  if (!data) throw new Error('No encontrado');
  res.json(data);
});
```

### 2. Parámetros de Ruta Opcionales

Express 5 soporta nativamente el modificador `?` para parámetros opcionales, algo que antes requería expresiones regulares complejas.

```javascript
// Express 4 - requería regex
app.get('/user/:id?', (req, res) => {});
app.get('/user/:id([^d]+)?', (req, res) => {});

// Express 5 - nativo
app.get('/user/:id?', (req, res) => {});
```

### 3. Eliminación de APIs Deprecated

Express 5 elimina varias características que estaban deprecated:

- **`res.redirect('back')`** - Eliminado, usa `res.redirect(-1)` o maneja el referer manualmente
- **`app.param(fn)`** - El callback de `app.param` ya no se invoca como middleware
- **`req.query` como setter** - Ahora es inmutable (solo getter)
- **`app.use(app.middleware)`** - Múltiples APIs de middleware eliminadas

```javascript
// Express 4 (deprecated)
// req.query = { foo: 'bar' }; // Funcionaba pero estaba deprecated

// Express 5
// req.query ya no se puede modificar
```

### 4. Routing Más Estricto

Express 5 lanza error en tiempo de ejecución si defines la misma ruta dos veces, en lugar de silenciar la segunda definición.

```javascript
// En Express 5 esto lanza un error
app.get('/users', handler1);
app.get('/users', handler2);
// Error: Route defined: GET /users
```

### 5. Sintaxis de Regex en Rutas

Los parámetros con regex requieren el prefijo `?:` para grupos no capturadores.

```javascript
// Express 4
app.get('/user/:id(\\d+)', handler);

// Express 5 - requiere (?: ...)
app.get('/user/(?:id)?(\\d+)', handler);
```

### 6. Mejoras de Rendimiento

- Sistema de routing reescrito para ser más rápido
- Reducción de uso de memoria
- Handling de middlewares más eficiente
- Optimizaciones internas en el matching de rutas

### 7. Requisitos de Node.js

Express 5 requiere **Node.js 18 o superior**. Las versiones anteriores de Node.js no son compatibles.

## Imágenes

Las imágenes se cargan dinámicamente desde la API de Wikipedia (Wikimedia Commons) utilizando el nombre científico de cada seta. El sistema intenta:

1. Buscar por nombre científico
2. Si no encuentra, buscar por nombre común
3. Como último recurso, añadir "mushroom" al nombre científico

## Estructura del Proyecto

```
setas-api/
├── src/
│   ├── app.js              # Configuración principal de Express
│   ├── server.js           # Punto de entrada
│   ├── controllers/        # Controladores de rutas
│   ├── data/               # Datos de setas
│   ├── docs/               # especificación OpenAPI
│   ├── routes/             # Definición de rutas API
│   └── views/              # Plantillas EJS
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## Ejemplos

### Crear una seta

```bash
curl -X POST http://localhost:3000/api/setas \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Nueva Seta","nombreCientifico":"Nueva species","categoria":"domesticada"}'
```

### Filtrar setas

```bash
curl "http://localhost:3000/api/setas?categoria=silvestre"
curl "http://localhost:3000/api/setas?nombre=Champi"
```

## License

MIT