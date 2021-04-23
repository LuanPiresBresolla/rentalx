import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { deleteFile } from '../../../../utils/file';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequeset {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatarFile }: IRequeset): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User already exists');
    }

    if (user.avatar) {
      await deleteFile(user.avatar);
    }

    user.avatar = avatarFile;

    await this.usersRepository.create(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
