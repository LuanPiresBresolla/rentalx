import { CarsRepositoryInMemory } from '@modules/cars/repositories/fakes/CarsRepositoryInMemory';

import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let createCarUseCase: CreateCarUseCase;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car 1',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const car2 = await createCarUseCase.execute({
      name: 'Car 2',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'AXC5490',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car, car2]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name_car_Teste',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Name_car_Teste',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name_car_Teste',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand_teste',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Brand_teste',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name_car_Teste',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC5490',
      fine_amount: 60,
      brand: 'Brand_teste',
      category_id: '54443',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '54443',
    });

    expect(cars).toEqual([car]);
  });
});
