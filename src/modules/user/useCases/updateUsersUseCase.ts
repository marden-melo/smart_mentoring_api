import { injectable, inject } from 'tsyringe';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { User } from '@prisma/client';

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute(id: string, data: Partial<User>): Promise<User> {
    const user = await this.usersRepository.update(id, data);
    return user;
  }
}
