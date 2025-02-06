import { ExpertiseArea } from '@prisma/client';
import { IMentorExpertiseRepository } from '../IMentorExpertiseRepository';
import { MentorExpertiseDTO } from '../../dtos/mentorExpertiseDTO';
import { prisma } from '@/lib/prisma';

export class MentorExpertiseRepository implements IMentorExpertiseRepository {
  async create(data: MentorExpertiseDTO): Promise<MentorExpertiseDTO> {
    return prisma.mentorExpertise.create({ data });
  }

  async getAll(): Promise<MentorExpertiseDTO[]> {
    return await prisma.mentorExpertise.findMany();
  }

  async findByMentorId(mentorId: string): Promise<MentorExpertiseDTO[]> {
    return prisma.mentorExpertise.findMany({ where: { mentorId } });
  }

  async delete(mentorId: string, expertiseId: string): Promise<void> {
    await prisma.mentorExpertise.delete({
      where: { mentorId_expertiseId: { mentorId, expertiseId } },
    });
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<MentorExpertiseDTO[]> {
    const mentorExpertise = await prisma.mentorExpertise.findMany({
      skip: offset,
      take: limit,
      select: {
        mentorId: true,
        expertiseId: true,
      },
    });

    return mentorExpertise.map((item) => ({
      id: `${item.mentorId}-${item.expertiseId}`,
      mentorId: item.mentorId,
      expertiseId: item.expertiseId,
    }));
  }

  async count(): Promise<number> {
    const total = await prisma.mentorExpertise.count();
    return total;
  }
}
