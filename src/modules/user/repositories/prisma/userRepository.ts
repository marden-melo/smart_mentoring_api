import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../IUserRepository';
import { prisma } from '@/lib/prisma';

export class UsersRepository implements IUsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }

  async update(id: string, data: Partial<Prisma.UserUpdateInput>) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }

  async findAllWithPagination(limit: number, offset: number): Promise<User[]> {
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
    });
    return users;
  }

  async countUsers(): Promise<number> {
    const total = await prisma.user.count();
    return total;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
