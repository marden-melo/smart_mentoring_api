import { injectable, inject } from 'tsyringe';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';
import { BudgetItemDTO } from '../dtos/budgetDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class AddItemsBudgetUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(budgetId: string, budgetItem: BudgetItemDTO) {
    const budget = await this.budgetRepository.getBudgetById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError('Budget not found');
    }

    return await this.budgetRepository.addItemToBudget(budgetId, budgetItem);
  }
}
