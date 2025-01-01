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

    @inject('DocumentRepository')
    private documentRepository: DocumentRepository,
  ) {}

  async execute(budgetId: string, documentData: DocumentInput) {
    // Verifica se o orçamento existe
    const budget = await this.budgetRepository.findById(budgetId);

    if (!budget) {
      throw new ResourceNotFoundError('Budget not found');
    }

    // Cria o registro do documento
    const document = await this.documentRepository.create({
      ...documentData,
      budgetId,
    });

    return document;
  }
}
