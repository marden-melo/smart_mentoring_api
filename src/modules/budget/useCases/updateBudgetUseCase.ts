import { injectable, inject } from 'tsyringe';
import { UpdateBudgetDTO } from '../dtos/budgetDTO';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class UpdateBudgetUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(budgetId: string, data: UpdateBudgetDTO) {
    const updatedBudget = await this.budgetRepository.updateBudget(
      budgetId,
      data,
    );

    return updatedBudget;
  }
}
