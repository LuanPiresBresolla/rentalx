import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificaitonDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    description,
    name,
  }: ICreateSpecificaitonDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(item => item.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    );

    return allSpecifications;
  }
}

export { SpecificationsInMemory };
