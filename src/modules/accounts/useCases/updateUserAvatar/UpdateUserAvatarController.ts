import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;
    const { id: user_id } = req.user;

    const createUserUseCase = container.resolve(UpdateUserAvatarUseCase);

    const user = await createUserUseCase.execute({
      user_id,
      avatarFile: filename,
    });

    delete user.password;

    return res.status(200).json(user);
  }
}

export { UpdateUserAvatarController };
