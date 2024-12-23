// getByIdUsersUseCase.ts
import { injectable, inject } from 'tsyringe';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { UserNotFoundError } from '@/utils/errors/userNotFoundError';
import { UserDTO } from '../dtos/usersDTO';

@injectable()
export class GetByIdUsersUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }
}
