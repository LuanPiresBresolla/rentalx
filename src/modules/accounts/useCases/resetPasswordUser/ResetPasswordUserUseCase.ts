import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersReposity: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensReposity: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.usersTokensReposity.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError('Token invalid!');
    }

    // if (
    //   this.dateProvider.compareIfBefore(
    //     userToken.expires_date,
    //     this.dateProvider.dateNow(),
    //   )
    // ) {
    //   throw new AppError('Token expired!');
    // }

    const user = await this.usersReposity.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersReposity.create(user);

    await this.usersTokensReposity.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase };
