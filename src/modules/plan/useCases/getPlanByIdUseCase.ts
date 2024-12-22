import { injectable, inject } from 'tsyringe';
import { Plan } from '@prisma/client';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { IPlanRepository } from '../repositories/IPlanRepository';

@injectable()
export class GetPlanByIdUseCase {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository,
  ) {}

  async execute(id: string): Promise<{ data: Plan }> {
    const plan: Plan | null = await this.planRepository.findById(id);

    if (!plan) {
      throw new ResourceNotFoundError();
    }

    return {
      data: plan,
    };
  }
}
