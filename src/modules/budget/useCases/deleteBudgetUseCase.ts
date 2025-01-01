import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';

@injectable()
export class DeleteBudgetUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const budget = await this.budgetRepository.getBudgetById(id);

    if (!budget) {
      throw new ResourceNotFoundError();
    }

    await this.budgetRepository.deleteBudget(id);
  }
}
