import { injectable, inject } from 'tsyringe';
import { BonusRepository } from '../repositories/prisma/bonusRepository';
import { CreateBonusDTO } from '../dtos/bonusDTO';

@injectable()
export class CreateBonusUseCase {
  constructor(
    @inject('BonusRepository')
    private bonusRepository: BonusRepository,
  ) {}

  async execute(data: CreateBonusDTO) {
    const bonus = await this.bonusRepository.create(data);

    return {
      data: bonus,
    };
  }
}
