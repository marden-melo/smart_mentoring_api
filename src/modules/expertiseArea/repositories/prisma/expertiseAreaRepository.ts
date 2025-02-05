import { ExpertiseArea } from '@prisma/client';
import { IExpertiseAreaRepository } from '../IExpertiseAreaRepository';
import { ExpertiseAreaDTO } from '../../dtos/expertiseAreaDTO';
import { prisma } from '@/lib/prisma';

export class ExpertiseAreaRepository implements IExpertiseAreaRepository {
  async create(data: ExpertiseAreaDTO): Promise<ExpertiseArea> {
    return await prisma.expertiseArea.create({
      data: {
        name: data.name,
      },
    });
  }

  async update(id: string, data: ExpertiseAreaDTO): Promise<ExpertiseArea> {
    return prisma.expertiseArea.update({
      where: { id },
      data,
    });
  }

  async getAll(): Promise<ExpertiseArea[]> {
    return await prisma.expertiseArea.findMany();
  }

  async getById(id: string): Promise<ExpertiseArea | null> {
    return await prisma.expertiseArea.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<boolean> {
    await prisma.expertiseArea.delete({
      where: { id },
    });
    return true;
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<ExpertiseArea[]> {
    const bonus = await prisma.expertiseArea.findMany({
      skip: offset,
      take: limit,
    });
    return bonus;
  }
  async count(): Promise<number> {
    const total = await prisma.expertiseArea.count();
    return total;
  }
}
