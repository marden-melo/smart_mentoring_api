import { injectable, inject } from 'tsyringe';
import { ConsultantExpertiseRepository } from '../repositories/prisma/consultantExpertiseRepository';
import { ConsultantExpertiseDTO } from '../dtos/consultantExpertiseDTO';

@injectable()
export class CreateConsultantExpertiseUseCase {
  constructor(
    @inject('ConsultantExpertiseRepository')
    private consultantExpertiseRepository: ConsultantExpertiseRepository,
  ) {}

  async execute(data: ConsultantExpertiseDTO) {
    return await this.consultantExpertiseRepository.create(data);
  }
}
