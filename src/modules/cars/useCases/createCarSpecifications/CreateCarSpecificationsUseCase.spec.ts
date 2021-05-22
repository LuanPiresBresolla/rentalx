import { CarsRepositoryInMemory } from '@modules/cars/repositories/fakes/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should not be able to add a new specification to a car nonexistent', async () => {
    expect(async () => {
      const car_id = '12345';
      const specifications_id = ['123'];

      await createCarSpecificationsUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specifications_id = ['123'];

    await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
