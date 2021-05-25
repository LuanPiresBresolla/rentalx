import { Specification } from '../infra/typeorm/entities/Specification';

export interface ICreateSpecificaitonDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create(data: ICreateSpecificaitonDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
