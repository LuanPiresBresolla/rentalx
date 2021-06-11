import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const {
      secret_refresh_token,
      expires_refresh_token_days,
      expires_in_refresh_token,
    } = auth;

    const { email, sub: user_id } = verify(
      token,
      secret_refresh_token,
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!userToken) {
      throw new AppError('Refresh token does not exist!');
    }

    // Deletando refresh token
    await this.usersTokensRepository.deleteById(userToken.id);

    // Gerando novo refresh token
    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    // Salvando novo refresh token
    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
