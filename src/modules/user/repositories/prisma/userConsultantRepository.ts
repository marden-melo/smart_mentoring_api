import { Consultant } from '@prisma/client';
import { IUserConsultantRepository } from '../IUserConsultantRepository';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class UserConsultantRepository implements IUserConsultantRepository {
  async upsert(data: {
    where: { userId: string };
    update: Partial<Consultant>;
    create: Prisma.ConsultantCreateInput;
  }): Promise<Consultant> {
    return prisma.consultant.upsert({
      where: data.where,
      update: data.update,
      create: data.create,
    });
  }

  async findByUserId(userId: string): Promise<Consultant | null> {
    return prisma.consultant.findUnique({
      where: { userId },
    });
  }

  async create(data: Prisma.ConsultantCreateInput): Promise<Consultant> {
    return prisma.consultant.create({
      data,
    });
  }

  async update(userId: string, data: Partial<Consultant>): Promise<Consultant> {
    return prisma.consultant.update({
      where: { userId },
      data,
    });
  }
}
