import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { MentorExpertiseRepository } from '../repositories/prisma/consultantExpertiseRepository';

@injectable()
export class DeleteMentorExpertiseUseCase {
  constructor(
    @inject('MentorExpertiseRepository')
    private mentorExpertiseRepository: MentorExpertiseRepository,
  ) {}

  async execute(mentorId: string, expertiseId: string): Promise<void> {
    const mentorExpertise =
      await this.mentorExpertiseRepository.findByMentorId(mentorId);

    if (!mentorExpertise.length) {
      throw new ResourceNotFoundError();
    }

    await this.mentorExpertiseRepository.delete(mentorId, expertiseId);
  }
}
