import { CarsRepositoryInMemory } from '@modules/cars/repositories/fakes/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Name car 2',
        description: 'Description 2',
        daily_rate: 100,
        license_plate: 'ABC5490',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      }),
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should be able to create a new car with available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
