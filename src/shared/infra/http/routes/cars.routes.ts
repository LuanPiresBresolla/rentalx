import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationsController } from '@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.get('/available', listAvailableCarsController.handle);

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

carsRoutes.post(
  '/:id/images',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
