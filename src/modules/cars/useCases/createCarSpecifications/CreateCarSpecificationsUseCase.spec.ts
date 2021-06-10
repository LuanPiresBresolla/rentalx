import { CarsRepositoryInMemory } from '@modules/cars/repositories/fakes/CarsRepositoryInMemory';
import { SpecificationsInMemory } from '@modules/cars/repositories/fakes/SpecificationsInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationsUseCase } from './CreateCarSpecificationsUseCase';

let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsInMemory: SpecificationsInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsInMemory = new SpecificationsInMemory();

    createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(
      carsRepositoryInMemory,
      specificationsInMemory,
    );
  });

  it('should not be able to add a new specification to a car nonexistent', async () => {
    const car_id = '12345';
    const specifications_id = ['123'];

    await expect(
      createCarSpecificationsUseCase.execute({
        car_id,
        specifications_id,
      }),
    ).rejects.toEqual(new AppError('Car does not exist'));
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

    const specification = await specificationsInMemory.create({
      description: 'Test',
      name: 'Test',
    });

    const specifications_id = [specification.id];

    const specificationsCar = await createCarSpecificationsUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCar).toHaveProperty('specifications');
    expect(specificationsCar.specifications.length).toBe(1);
  });
});
