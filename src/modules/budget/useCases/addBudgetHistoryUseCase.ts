import { injectable, inject } from 'tsyringe';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class AddBudgetHistoryUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(
    budgetId: string,
    description: string,
    userId: string,
    changeType: string,
  ) {
    const budget = await this.budgetRepository.getBudgetById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError('Budget not found');
    }

    return await this.budgetRepository.addBudgetHistory(
      budgetId,
      description,
      userId,
      changeType,
    );
  }
}
