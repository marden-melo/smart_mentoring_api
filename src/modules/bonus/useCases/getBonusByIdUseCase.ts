import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { BonusRepository } from '../repositories/prisma/bonusRepository';
import { GetBonusDTO } from '../dtos/bonusDTO';

@injectable()
export class GetBonusByIdUseCase {
  constructor(
    @inject('BonusRepository')
    private bonusRepository: BonusRepository,
  ) {}

  async execute(id: string): Promise<{ data: GetBonusDTO }> {
    const bonus = await this.bonusRepository.getById(id);

    if (!bonus) {
      throw new ResourceNotFoundError();
    }
    const result: GetBonusDTO = {
      id: bonus.id,
      description: bonus.description,
      percentage: bonus.percentage ?? 0,
      value: bonus.value ?? 0,
    };

    return {
      data: result,
    };
  }
}
