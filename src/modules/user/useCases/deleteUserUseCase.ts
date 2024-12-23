import { injectable, inject } from 'tsyringe';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { UserNotFoundError } from '@/utils/errors/userNotFoundError';

@injectable()
export class DeleteUsersUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.usersRepository.delete(id);
  }
}
