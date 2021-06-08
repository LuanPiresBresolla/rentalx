import { CarsRepositoryInMemory } from '@modules/cars/repositories/fakes/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/fakes/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123456',
      user_id: '123456',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      car_id: '45646',
      user_id: 'test',
      expected_return_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'asdasda',
        user_id: 'test',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);

    // await expect(
    //   createRentalUseCase.execute({
    //     car_id: '123456',
    //     user_id: 'test',
    //     expected_return_date: dayAdd24Hours,
    //   }),
    // ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      car_id: 'test',
      user_id: '1112',
      expected_return_date: dayAdd24Hours,
    });

    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        user_id: 'aaa2',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);

    // await expect(
    //   createRentalUseCase.execute({
    //     car_id: 'test',
    //     user_id: '123456',
    //     expected_return_date: dayAdd24Hours,
    //   }),
    // ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'tedasdasdst',
        user_id: 'aaaaa1231a2',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
