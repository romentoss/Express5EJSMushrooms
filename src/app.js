import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import spec from './docs/spec.json' with { type: 'json' };
import { NotFoundError } from './controllers/setasController.js';
import { setas } from './data/setas.js';
import setasRouter from './routes/setas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/setas', setasRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));

app.get('/', (req, res) => {
  res.render('home', { title: 'API Setas Comestibles' });
});

app.get('/setas', (req, res) => {
  const { nombre, categoria, filtro } = req.query;
  let resultado = [...setas];

  if (nombre) {
    resultado = resultado.filter(s => s.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }
  if (categoria) {
    resultado = resultado.filter(s => s.categoria === categoria);
  }

  res.render('setas/index', { setas: resultado, filtros: { nombre, categoria }, filtro: filtro || '', title: 'Catálogo' });
});

app.get('/setas/:id', (req, res) => {
  const seta = setas.find(s => s.id === req.params.id);
  if (!seta) throw new NotFoundError('Seta no encontrada');
  res.render('setas/detail', { seta, title: seta.nombre });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;