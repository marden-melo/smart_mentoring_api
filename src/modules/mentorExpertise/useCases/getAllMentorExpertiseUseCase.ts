import { injectable, inject } from 'tsyringe';
import { MentorExpertiseDTO } from '../dtos/mentorExpertiseDTO';
import { MentorExpertiseRepository } from '../repositories/prisma/mentorExpertiseRepository';

@injectable()
export class GetAllMentorExpertiseUseCase {
  constructor(
    @inject('MentorExpertiseRepository')
    private mentorExpertiseRepository: MentorExpertiseRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const mentorExpertise: MentorExpertiseDTO[] =
      await this.mentorExpertiseRepository.findAllWithPagination(limit, offset);
    const total = await this.mentorExpertiseRepository.count();

    return {
      data: mentorExpertise,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
