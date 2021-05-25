import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationsController();

const carsRoutes = Router();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle,
);

carsRoutes.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
