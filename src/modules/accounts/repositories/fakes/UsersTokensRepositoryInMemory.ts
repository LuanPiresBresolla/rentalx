import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserToken[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserToken> {
    const token = new UserToken();

    Object.assign(token, data);

    this.usersTokens.push(token);

    return token;
  }

  async deleteById(id: string): Promise<void> {
    const tokenIndex = this.usersTokens.findIndex(token => token.id === id);

    this.usersTokens.splice(tokenIndex, 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.usersTokens.find(
      token => token.refresh_token === refresh_token,
    );
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    return this.usersTokens.find(
      token =>
        token.user_id === user_id && token.refresh_token === refresh_token,
    );
  }
}

export { UsersTokensRepositoryInMemory };
