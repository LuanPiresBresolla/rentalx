import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

import swaggerJson from '../../../swagger.json';
import { routes } from './routes';

createConnection();
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use(routes);

// eslint-disable-next-line
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });
});

export { app };
