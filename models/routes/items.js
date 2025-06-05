import express from 'express';
import store from '../models/itemStore.js';

const router = express.Router();

/**
 * GET /items
 * Liste tous les items
 */
router.get('/', (_, res) => {
  res.json(store.getAll());
});

/**
 * GET /items/:id
 * Récupère un item
 */
router.get('/:id', (req, res) => {
  const item = store.get(req.params.id);
  if (item) res.json(item);
  else res.status(404).json({ message: 'Item not found' });
});

/**
 * POST /items
 * Crée un nouvel item
 * Body: { "name": "foo", "value": 42 }
 */
router.post('/', (req, res) => {
  const created = store.create(req.body);
  res.status(201).json(created);
});

/**
 * PUT /items/:id
 * Met à jour un item
 */
router.put('/:id', (req, res) => {
  const updated = store.update(req.params.id, req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ message: 'Item not found' });
});

/**
 * DELETE /items/:id
 * Supprime un item
 */
router.delete('/:id', (req, res) => {
  const ok = store.remove(req.params.id);
  if (ok) res.status(204).end();
  else res.status(404).json({ message: 'Item not found' });
});

export default router;
