import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const user = await authenticateUserUseCase.execute({
      email,
      password,
    });

    delete user.user.password;

    return res.status(200).json(user);
  }
}

export { AuthenticateUserController };
