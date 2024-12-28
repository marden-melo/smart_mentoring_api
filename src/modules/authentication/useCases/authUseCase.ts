import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { AuthDTO, AuthUseCaseResponse } from '../dtos/authDTO';
import { InvalidCredentialsError } from '@/utils/errors/invalidCredentialsError';
import { IUsersRepository } from '@/modules/user/repositories/IUserRepository';

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: AuthDTO): Promise<AuthUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
