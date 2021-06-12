import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { getRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const token = this.repository.create(data);

    await this.repository.save(token);

    return token;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    return this.repository.findOne({ user_id, refresh_token });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.repository.findOne({ refresh_token });
  }
}

export { UsersTokensRepository };
