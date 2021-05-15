import { ICreateCarDTO } from '@modules/cars/dtos/ICraeteCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);
  }
}

export { CarsRepository };
