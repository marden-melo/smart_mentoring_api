import { injectable, inject } from 'tsyringe';
import { ExpertiseAreaRepository } from '../repositories/prisma/expertiseAreaRepository';
import { ExpertiseAreaDTO } from '../dtos/expertiseAreaDTO';

@injectable()
export class CreateExpertiseAreaUseCase {
  constructor(
    @inject('ExpertiseAreaRepository')
    private expertiseAreaRepository: ExpertiseAreaRepository,
  ) {}

  async execute(data: ExpertiseAreaDTO) {
    return await this.expertiseAreaRepository.create(data);
  }
}
