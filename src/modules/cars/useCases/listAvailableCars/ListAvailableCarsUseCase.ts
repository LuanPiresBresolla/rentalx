import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ name, brand, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      name,
      brand,
      category_id,
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase };
