import { injectable, inject } from 'tsyringe';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { User } from '@prisma/client';

@injectable()
export class GetAllUsersUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const users: User[] = await this.usersRepository.findAllWithPagination(
      limit,
      offset,
    );
    const total = await this.usersRepository.countUsers();

    return {
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
