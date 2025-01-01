import { injectable, inject } from 'tsyringe';
import { IBudgetRepository } from '../repositories/IBudgetRepository';
import { BudgetFilterDTO } from '../dtos/budgetDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { ClientRepository } from '@/modules/client/repositories/prisma/clientRepository';

@injectable()
export class GetBudgetsByClientIdUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
    @inject('ClientRepository')
    private clientRepository: ClientRepository,
  ) {}

  async execute(
    clientId: string,
    page: number = 1,
    limit: number = 10,
    filters?: BudgetFilterDTO,
  ) {
    const client = await this.clientRepository.getClientById(clientId);
    if (!client) {
      throw new ResourceNotFoundError('Client not found');
    }

    const { data, total } = await this.budgetRepository.findPaginatedByClientId(
      clientId,
      page,
      limit,
      filters,
    );

    if (!data || data.length === 0) {
      throw new ResourceNotFoundError('No budgets found for this client');
    }

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
