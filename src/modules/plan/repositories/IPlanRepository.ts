import { Prisma, Plan } from '@prisma/client';

export interface IPlanRepository {
  findById(id: string): Promise<Plan | null>;
  create(data: Prisma.PlanCreateInput): Promise<Plan>;
  findAll(): Promise<Plan[]>;
  update(id: string, data: Partial<Prisma.PlanUpdateInput>): Promise<Plan>;
  delete(id: string): Promise<void>;
  findAllWithPagination(limit: number, offset: number): Promise<Plan[]>;
  countItems(): Promise<number>;
}
