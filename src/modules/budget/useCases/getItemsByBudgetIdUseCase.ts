import { injectable, inject } from 'tsyringe';
import { IBudgetRepository } from '../repositories/IBudgetRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetItemsByBudgetIdUseCase {
  constructor(
    @inject('IBudgetRepository')
    private budgetRepository: IBudgetRepository,
  ) {}

  async execute(budgetId: string) {
    const budget = await this.budgetRepository.getBudgetById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError('Budget not found');
    }

    return await this.budgetRepository.getItemsByBudgetId(budgetId);
  }
}
