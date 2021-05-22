import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

const carsRoutes = Router();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
