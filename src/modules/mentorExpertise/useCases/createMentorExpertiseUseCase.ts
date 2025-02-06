import { injectable, inject } from 'tsyringe';

import { MentorExpertiseDTO } from '../dtos/mentorExpertiseDTO';
import { MentorExpertiseRepository } from '../repositories/prisma/mentorExpertiseRepository';

@injectable()
export class CreateMentorExpertiseUseCase {
  constructor(
    @inject('MentorExpertiseRepository')
    private mentorExpertiseRepository: MentorExpertiseRepository,
  ) {}

  async execute(data: MentorExpertiseDTO) {
    return await this.mentorExpertiseRepository.create(data);
  }
}
