import { injectable, inject } from 'tsyringe';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';
import { CreateBudgetDTO } from '../dtos/budgetDTO';

@injectable()
export class CreateBudgetUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(data: CreateBudgetDTO) {
    const { items, documents, ...budgetData } = data;

    const createdBudget = await this.budgetRepository.createBudget({
      ...budgetData,
      items,
      documents,
    });

    return {
      data: createdBudget,
    };
  }
}
