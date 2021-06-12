import { UsersRepositoryInMemory } from '@modules/accounts/repositories/fakes/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/fakes/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/fakes/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    const user = await usersRepositoryInMemory.create({
      driver_license: '003945',
      email: 'ru@hotunan.ai',
      name: 'Tommy Hunter',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send a mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('a@a.com'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const token = spyOn(usersTokensRepositoryInMemory, 'create');

    const user = await usersRepositoryInMemory.create({
      driver_license: '003945',
      email: 'ru@hotunan.ai',
      name: 'Tommy Hunter',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(token).toHaveBeenCalled();
  });
});
