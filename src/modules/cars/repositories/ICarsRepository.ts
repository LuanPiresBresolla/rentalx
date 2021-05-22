import { ICreateCarDTO } from '../dtos/ICraeteCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    name?: string,
    brand?: string,
    category_id?: string,
  ): Promise<Car[]>;
}
