import { injectable, inject } from 'tsyringe';
import { Plan } from '@prisma/client';
import { IPlanRepository } from '../repositories/IPlanRepository';

@injectable()
export class GetAllPlansUseCase {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository,
  ) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Plan[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;

    const plans: Plan[] = await this.planRepository.findAllWithPagination(
      limit,
      offset,
    );
    const total = await this.planRepository.countItems();

    return {
      data: plans,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
