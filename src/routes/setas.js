import express from 'express';
import { setas } from '../data/setas.js';
import { NotFoundError } from '../controllers/setasController.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { nombre, categoria, filtro } = req.query;
  let resultado = [...setas];

  if (nombre) {
    resultado = resultado.filter(s => s.nombre.toLowerCase().includes(nombre.toLowerCase()));
  }
  if (categoria) {
    resultado = resultado.filter(s => s.categoria === categoria);
  }

  res.render('setas/index', {
    title: 'Catálogo de Setas',
    setas: resultado,
    filtros: { nombre, categoria },
    filtro: filtro || ''
  });
});

router.get('/:id', (req, res) => {
  const seta = setas.find(s => s.id === req.params.id);
  if (!seta) throw new NotFoundError('Seta no encontrada');
  res.json(seta);
});

router.post('/', (req, res) => {
  const { nombre, nombreCientifico, categoria, descripcion, temporada, comestibilidad, imagen } = req.body;

  if (!nombre || !nombreCientifico || !categoria) {
    res.status(400).json({ error: 'Nombre, nombre científico y categoría son obligatorios' });
    return;
  }

  const newId = String(setas.length + 1);
  const newSeta = {
    id: newId,
    nombre,
    nombreCientifico,
    categoria,
    descripcion: descripcion || '',
    temporada: temporada || '',
    comestibilidad: comestibilidad || 'media',
    imagen: imagen || ''
  };

  setas.push(newSeta);
  res.status(201).json(newSeta);
});

router.put('/:id', (req, res) => {
  const index = setas.findIndex(s => s.id === req.params.id);
  if (index === -1) throw new NotFoundError('Seta no encontrada');

  const updatedSeta = { ...setas[index], ...req.body, id: req.params.id };
  setas[index] = updatedSeta;
  res.json(updatedSeta);
});

router.delete('/:id', (req, res) => {
  const index = setas.findIndex(s => s.id === req.params.id);
  if (index === -1) throw new NotFoundError('Seta no encontrada');

  setas.splice(index, 1);
  res.status(204).send();
});

export default router;