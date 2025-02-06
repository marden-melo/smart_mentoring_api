import { MentorExpertiseDTO } from '../dtos/mentorExpertiseDTO';

export interface IMentorExpertiseRepository {
  create(data: MentorExpertiseDTO): Promise<MentorExpertiseDTO>;
  getAll(): Promise<MentorExpertiseDTO[]>;
  findByMentorId(mentorId: string): Promise<MentorExpertiseDTO[]>;
  delete(mentorId: string, expertiseId: string): Promise<void>;
  findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<MentorExpertiseDTO[]>;
  count(): Promise<number>;
}
