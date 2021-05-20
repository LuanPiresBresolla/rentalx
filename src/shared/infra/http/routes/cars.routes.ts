import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

const createCarsController = new CreateCarController();

const carsRoutes = Router();

carsRoutes.post('/', createCarsController.handle);

export { carsRoutes };
