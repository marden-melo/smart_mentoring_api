import { injectable, inject } from 'tsyringe';
import { ConsultantExpertiseRepository } from '../repositories/prisma/consultantExpertiseRepository';
import { ConsultantExpertiseDTO } from '../dtos/consultantExpertiseDTO';

@injectable()
export class GetAllConsultantExpertiseUseCase {
  constructor(
    @inject('ConsultantExpertiseRepository')
    private consultantExpertiseRepository: ConsultantExpertiseRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const consultantExpertise: ConsultantExpertiseDTO[] =
      await this.consultantExpertiseRepository.findAllWithPagination(
        limit,
        offset,
      );
    const total = await this.consultantExpertiseRepository.count();

    return {
      data: consultantExpertise,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
