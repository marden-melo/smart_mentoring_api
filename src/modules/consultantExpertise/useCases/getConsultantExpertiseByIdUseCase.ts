import { injectable, inject } from 'tsyringe';
import { ConsultantExpertiseRepository } from '../repositories/prisma/consultantExpertiseRepository';

@injectable()
export class GetConsultantExpertiseByIdUseCase {
  constructor(
    @inject('ConsultantExpertiseRepository')
    private consultantExpertiseRepository: ConsultantExpertiseRepository,
  ) {}

  async execute(consultantId: string) {
    return await this.consultantExpertiseRepository.findByConsultantId(
      consultantId,
    );
  }
}
