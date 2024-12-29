import { injectable, inject } from 'tsyringe';
import { Bonus } from '@prisma/client';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { BonusRepository } from '../repositories/prisma/bonusRepository';
import { UpdateBonusDTO } from '../dtos/bonusDTO';

@injectable()
export class UpdateBonusUseCase {
  constructor(
    @inject('BonusRepository')
    private bonusRepository: BonusRepository,
  ) {}

  async execute(id: string, data: UpdateBonusDTO): Promise<Bonus> {
    const bonus = await this.bonusRepository.getById(id);

    if (!bonus) {
      throw new ResourceNotFoundError('Bonus not found');
    }

    return this.bonusRepository.update(id, data);
  }
}
