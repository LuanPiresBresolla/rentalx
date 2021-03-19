import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express());

app.use('/categories', categoriesRoutes);

app.listen(3333, () => console.log('Server started in port 3333 🚀🔥'));
