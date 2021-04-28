import { AppError } from '@errors/AppError';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
  });

  it('Should be able to authenticate an user', async () => {
    const user = {
      name: 'Administrador',
      email: 'admin@test.com',
      password: '1234',
      driver_license: '123456789',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an user nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fake@fake.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with a password incorrect', async () => {
    expect(async () => {
      const user = {
        name: 'Administrador',
        email: 'admin@test.com',
        password: '1234',
        driver_license: '123456789',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
