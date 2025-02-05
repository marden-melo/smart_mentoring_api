import { injectable, inject } from 'tsyringe';
import { ExpertiseAreaRepository } from '../repositories/prisma/expertiseAreaRepository';
import { ExpertiseArea } from '@prisma/client';

@injectable()
export class GetAllExpertiseAreaUseCase {
  constructor(
    @inject('ExpertiseAreaRepository')
    private expertiseAreaRepository: ExpertiseAreaRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const expertiseArea: ExpertiseArea[] =
      await this.expertiseAreaRepository.findAllWithPagination(limit, offset);
    const total = await this.expertiseAreaRepository.count();

    return {
      data: expertiseArea,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
