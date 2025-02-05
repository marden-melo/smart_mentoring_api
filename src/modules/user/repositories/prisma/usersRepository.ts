import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../IUserRepository';
import { prisma } from '@/lib/prisma';

export class UsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        mentor: true,
        consultant: true,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        mentor: true,
        consultant: true,
      },
    });

    return user;
  }

  async findAll() {
    const users = await prisma.user.findMany({
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        mentor: true,
        consultant: true,
      },
    });
    return users;
  }

  async update(id: string, data: Partial<Prisma.UserUpdateInput>) {
    const user = await prisma.user.update({
      where: { id },
      data,
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        mentor: true,
        consultant: true,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        mentor: true,
        consultant: true,
      },
    });
    return user;
  }

  async findAllWithPagination(limit: number, offset: number): Promise<User[]> {
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        mentor: true,
        consultant: true,
      },
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
