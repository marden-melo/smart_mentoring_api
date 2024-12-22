import { injectable, inject } from 'tsyringe';
import { PlanRepository } from '../repositories/prisma/planRepository';
import { PlanDTO, PlanUseCaseResponse } from '../dtos/planDTO';

@injectable()
export class CreatePlanUseCase {
  constructor(
    @inject('PlanRepository') private planRepository: PlanRepository,
  ) {}

  async execute({ name, price }: PlanDTO): Promise<PlanUseCaseResponse> {
    const plan = await this.planRepository.create({
      name,
      price,
    });

    return {
      data: plan,
    };
  }
}
