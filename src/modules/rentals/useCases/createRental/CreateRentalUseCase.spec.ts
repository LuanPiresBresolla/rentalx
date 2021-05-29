import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/fakes/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '123456',
      user_id: '123456',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      car_id: '45646',
      user_id: 'test',
      expected_return_date: new Date(),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: '123456',
        user_id: 'test',
        expected_return_date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      car_id: 'test',
      user_id: '1112',
      expected_return_date: new Date(),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'test',
        user_id: '123456',
        expected_return_date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
