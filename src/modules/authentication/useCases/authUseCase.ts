import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '@/modules/user/repositories/prisma/userRepository';
import { compare } from 'bcryptjs';
import { AuthDTO, AuthUseCaseResponse } from '../dtos/authDTO';
import { InvalidCredentialsError } from '@/utils/errors/invalidCredentialsError';

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
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

    return {
      user,
    };
  }
}
