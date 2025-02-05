import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { ExpertiseAreaRepository } from '../repositories/prisma/expertiseAreaRepository';

@injectable()
export class DeleteExpertiseAreaUseCase {
  constructor(
    @inject('ExpertiseAreaRepository')
    private expertiseAreaRepository: ExpertiseAreaRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const expertiseArea = await this.expertiseAreaRepository.getById(id);

    if (!expertiseArea) {
      throw new ResourceNotFoundError();
    }

    await this.expertiseAreaRepository.delete(id);
  }
}
