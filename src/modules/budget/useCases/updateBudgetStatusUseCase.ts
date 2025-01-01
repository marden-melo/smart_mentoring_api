import { injectable, inject } from 'tsyringe';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { BudgetStatus } from '@prisma/client';

@injectable()
export class UpdateBudgetStatusUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(budgetId: string, status: BudgetStatus) {
    const budget = await this.budgetRepository.getBudgetById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError('Budget not found');
    }

    return await this.budgetRepository.updateBudgetStatus(budgetId, status);
  }
}
