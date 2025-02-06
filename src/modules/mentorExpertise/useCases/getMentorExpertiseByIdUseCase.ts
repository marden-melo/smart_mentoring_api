import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { MentorExpertiseDTO } from '../dtos/mentorExpertiseDTO';
import { MentorExpertiseRepository } from '../repositories/prisma/mentorExpertiseRepository';

@injectable()
export class GetMentorExpertiseByIdUseCase {
  constructor(
    @inject('MentorExpertiseRepository')
    private mentorExpertiseRepository: MentorExpertiseRepository,
  ) {}

  async execute(mentorId: string): Promise<MentorExpertiseDTO[]> {
    const mentorExpertise =
      await this.mentorExpertiseRepository.findByMentorId(mentorId);

    if (!mentorExpertise.length) {
      throw new ResourceNotFoundError();
    }

    return mentorExpertise;
  }
}
