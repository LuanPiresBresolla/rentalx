import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }
}

export { UsersRepository };
