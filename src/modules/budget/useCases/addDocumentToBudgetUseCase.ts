import { injectable, inject } from 'tsyringe';
import { BudgetRepository } from '../repositories/prisma/budgetRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

interface DocumentInput {
  fileName: string;
  filePath: string;
  fileType: string;
}

@injectable()
export class AddDocumentToBudgetUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: BudgetRepository,
  ) {}

  async execute(budgetId: string, documentData: DocumentInput) {
    const budget = await this.budgetRepository.getBudgetById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError('Budget not found');
    }

    const document = await this.budgetRepository.addDocumentToBudget(
      budgetId,
      documentData,
    );

    return document;
  }
}
