import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  categories.push({
    id: uuid(),
    name,
    description,
    created_at: new Date(),
  });

  return res.status(201).json({ ok: true });
});

export { categoriesRoutes };
