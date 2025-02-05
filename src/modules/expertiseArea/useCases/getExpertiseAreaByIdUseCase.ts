import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { ExpertiseAreaRepository } from '../repositories/prisma/expertiseAreaRepository';
import { ExpertiseAreaDTO } from '../dtos/expertiseAreaDTO';

@injectable()
export class GetExpertiseAreaByIdUseCase {
  constructor(
    @inject('ExpertiseAreaRepository')
    private expertiseAreaRepository: ExpertiseAreaRepository,
  ) {}

  async execute(id: string): Promise<{ data: ExpertiseAreaDTO }> {
    const expertiseArea = await this.expertiseAreaRepository.getById(id);

    if (!expertiseArea) {
      throw new ResourceNotFoundError();
    }
    const result: ExpertiseAreaDTO = {
      id: expertiseArea.id,
      name: expertiseArea.name,
    };

    return {
      data: result,
    };
  }
}
