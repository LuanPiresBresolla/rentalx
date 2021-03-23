import { Specification } from '../models/Specification';

export interface ICreateSpecificaitonDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  findByName(name: string): Specification;
  list(): Specification[];
  create(data: ICreateSpecificaitonDTO): Specification;
}
