import { injectable, inject } from 'tsyringe';
import { ConsultantExpertiseRepository } from '../repositories/prisma/consultantExpertiseRepository';

@injectable()
export class GetAllConsultantExpertiseUseCase {
  constructor(
    @inject('ConsultantExpertiseRepository')
    private consultantExpertiseRepository: ConsultantExpertiseRepository,
  ) {}

  async execute() {
    return await this.consultantExpertiseRepository.getAll();
  }
}
