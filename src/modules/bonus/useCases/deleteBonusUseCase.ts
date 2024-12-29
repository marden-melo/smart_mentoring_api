import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { BonusRepository } from '../repositories/prisma/bonusRepository';

@injectable()
export class DeleteBonusUseCase {
  constructor(
    @inject('BonusRepository')
    private bonusRepository: BonusRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const bonus = await this.bonusRepository.getById(id);

    if (!bonus) {
      throw new ResourceNotFoundError();
    }

    await this.bonusRepository.delete(id);
  }
}
