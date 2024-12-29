import { injectable, inject } from 'tsyringe';
import { BonusRepository } from '../repositories/prisma/bonusRepository';
import { Bonus } from '@prisma/client';

@injectable()
export class GetAllBonusesUseCase {
  constructor(
    @inject('BonusRepository')
    private bonusRepository: BonusRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const bonuses: Bonus[] = await this.bonusRepository.findAllWithPagination(
      limit,
      offset,
    );
    const total = await this.bonusRepository.countBonus();

    return {
      data: bonuses,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
