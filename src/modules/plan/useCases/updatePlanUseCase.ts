import { injectable, inject } from 'tsyringe';
import { Plan } from '@prisma/client';
import { IPlanRepository } from '../repositories/IPlanRepository';

@injectable()
export class UpdatePlanUseCase {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository,
  ) {}

  async execute(id: string, data: Partial<Plan>): Promise<Plan> {
    const plan = await this.planRepository.update(id, data);
    return plan;
  }
}
