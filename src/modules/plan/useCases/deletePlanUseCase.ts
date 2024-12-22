import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { IPlanRepository } from '../repositories/IPlanRepository';

@injectable()
export class DeletePlanUseCase {
  constructor(
    @inject('PlanRepository') private planRepository: IPlanRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const item = await this.planRepository.findById(id);

    if (!item) {
      throw new ResourceNotFoundError();
    }

    await this.planRepository.delete(id);
  }
}
