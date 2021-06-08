import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  rental_id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ rental_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) {
      throw new AppError('Rental does not exist');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError('Car does not exist');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.created_at,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = 1;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
