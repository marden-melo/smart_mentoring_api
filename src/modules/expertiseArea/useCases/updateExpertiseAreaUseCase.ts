import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { ExpertiseAreaRepository } from '../repositories/prisma/expertiseAreaRepository';
import { ExpertiseAreaDTO } from '../dtos/expertiseAreaDTO';

@injectable()
export class UpdateExpertiseAreaUseCase {
  constructor(
    @inject('ExpertiseAreaRepository')
    private expertiseAreaRepository: ExpertiseAreaRepository,
  ) {}

  async execute(id: string, data: ExpertiseAreaDTO): Promise<ExpertiseAreaDTO> {
    const expertiseArea = await this.expertiseAreaRepository.getById(id);

    if (!expertiseArea) {
      throw new ResourceNotFoundError('Expertise Area not found');
    }

    return this.expertiseAreaRepository.update(id, data);
  }
}
