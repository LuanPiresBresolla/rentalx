import { Specification } from '../entities/Specification';

export interface ICreateSpecificaitonDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create(data: ICreateSpecificaitonDTO): Promise<Specification>;
}
