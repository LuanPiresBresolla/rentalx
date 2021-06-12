import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password } = req.body;
    const { token } = req.query;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase,
    );

    await resetPasswordUserUseCase.execute({ password, token: String(token) });

    return res.json();
  }
}

export { ResetPasswordUserController };
