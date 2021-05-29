import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      ...data,
      start_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }
}

export { RentalsRepositoryInMemory };
