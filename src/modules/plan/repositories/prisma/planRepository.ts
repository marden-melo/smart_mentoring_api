import { Prisma, Plan } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { IPlanRepository } from '../IPlanRepository';

export class PlanRepository implements IPlanRepository {
  async findById(id: string): Promise<Plan | null> {
    return await prisma.plan.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.PlanCreateInput): Promise<Plan> {
    return await prisma.plan.create({
      data,
    });
  }

  async findAll(): Promise<Plan[]> {
    return await prisma.plan.findMany();
  }

  async update(
    id: string,
    data: Partial<Prisma.PlanUpdateInput>,
  ): Promise<Plan> {
    return await prisma.plan.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.plan.delete({
      where: { id },
    });
  }

  async findAllWithPagination(limit: number, offset: number): Promise<Plan[]> {
    return await prisma.plan.findMany({
      take: limit,
      skip: offset,
    });
  }

  async countItems(): Promise<number> {
    return await prisma.plan.count();
  }
}
