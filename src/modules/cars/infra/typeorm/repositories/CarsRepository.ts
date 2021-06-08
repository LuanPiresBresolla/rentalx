import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICraeteCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    return this.repository.save(car);
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string,
  ): Promise<Car[]> {
    const query = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) {
      query.andWhere('c.brand = :brand', { brand });
    }

    if (name) {
      query.andWhere('c.name = :name', { name });
    }

    if (category_id) {
      query.andWhere('c.category_id = :category_id', { category_id });
    }

    const cars = await query.getMany();

    return cars;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
