import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';

@injectable()
export class RemoveItemFromBudgetUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(budgetId: string, itemId: string) {
    const budget = await this.budgetRepository.getBudgetById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError('Budget not found');
    }

    return await this.budgetRepository.removeItemFromBudget(budgetId, itemId);
  }
}
