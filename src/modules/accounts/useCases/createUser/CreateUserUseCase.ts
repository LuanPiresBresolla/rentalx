import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
    username,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      email,
      driver_license,
      password,
      username,
    });

    return user;
  }
}

export { CreateUserUseCase };
