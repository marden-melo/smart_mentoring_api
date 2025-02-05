import { Mentor, Prisma } from '@prisma/client';
import { IUserMentorRepository } from '../IUserMentorRepository';
import { prisma } from '@/lib/prisma';

export class UserMentorRepository implements IUserMentorRepository {
  async upsert(data: {
    where: { userId: string };

    update: Partial<Mentor>;
    create: Prisma.MentorCreateInput;
  }): Promise<Mentor> {
    return prisma.mentor.upsert({
      where: data.where,
      update: data.update,
      create: data.create,
    });
  }

  async findByUserId(userId: string): Promise<Mentor | null> {
    return prisma.mentor.findUnique({
      where: { userId },
    });
  }

  async create(data: Prisma.MentorCreateInput): Promise<Mentor> {
    return prisma.mentor.create({
      data,
    });
  }

  async update(userId: string, data: Partial<Mentor>): Promise<Mentor> {
    return prisma.mentor.update({
      where: { userId },
      data,
    });
  }
}
