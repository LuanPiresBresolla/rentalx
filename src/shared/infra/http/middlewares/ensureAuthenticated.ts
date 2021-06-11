import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';

interface IPayload {
  sub: string;
}

// eslint-disable-next-line
export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    req.user = { id: user_id };

    return next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
