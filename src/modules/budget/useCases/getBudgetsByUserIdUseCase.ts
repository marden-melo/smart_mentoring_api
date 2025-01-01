import { injectable, inject } from 'tsyringe';
import { IBudgetRepository } from '../repositories/IBudgetRepository';
import { BudgetFilterDTO } from '../dtos/budgetDTO';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetBudgetsByUserIdUseCase {
  constructor(
    @inject('BudgetRepository')
    private budgetRepository: IBudgetRepository,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    userId: string,
    page: number = 1,
    limit: number = 10,
    filters?: BudgetFilterDTO,
  ) {
    const { data, total } = await this.budgetRepository.findPaginatedByUserId(
      userId,
      page,
      limit,
      filters,
    );

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (!data || data.length === 0) {
      throw new ResourceNotFoundError();
    }

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
