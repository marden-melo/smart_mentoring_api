import { Consultant } from '@prisma/client';
import { IUserConsultantRepository } from '../IUserConsultantRepository';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class UserConsultantRepository implements IUserConsultantRepository {
  async upsert(data: {
    where: { userId: string };
    update: Partial<Consultant>;
    create: Prisma.ConsultantCreateInput;
    expertiseIds: string[];
  }): Promise<Consultant> {
    return prisma.consultant.upsert({
      where: data.where,
      update: {
        ...data.update,
        expertiseAreas: {
          deleteMany: {},
          create: data.expertiseIds.map((expertiseId) => ({
            expertiseArea: { connect: { id: expertiseId } },
          })),
        },
      },
      create: {
        ...data.create,
        expertiseAreas: {
          create: data.expertiseIds.map((expertiseId) => ({
            expertiseArea: { connect: { id: expertiseId } },
          })),
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Consultant | null> {
    return prisma.consultant.findUnique({
      where: { userId },
      include: {
        expertiseAreas: {
          include: {
            expertiseArea: true,
          },
        },
      },
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
