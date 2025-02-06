import { ConsultantExpertiseDTO } from '../../dtos/consultantExpertiseDTO';
import { IConsultantExpertiseRepository } from '../IConsultantExpertiseRepository';
import { prisma } from '@/lib/prisma';

export class ConsultantExpertiseRepository
  implements IConsultantExpertiseRepository
{
  async create(data: ConsultantExpertiseDTO): Promise<ConsultantExpertiseDTO> {
    return prisma.consultantExpertise.create({ data });
  }

  async getAll(): Promise<ConsultantExpertiseDTO[]> {
    return await prisma.consultantExpertise.findMany();
  }

  async findByConsultantId(
    consultantId: string,
  ): Promise<ConsultantExpertiseDTO[]> {
    return prisma.consultantExpertise.findMany({ where: { consultantId } });
  }

  async delete(consultantId: string, expertiseId: string): Promise<void> {
    await prisma.consultantExpertise.delete({
      where: { consultantId_expertiseId: { consultantId, expertiseId } },
    });
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<ConsultantExpertiseDTO[]> {
    const consultantExpertise = await prisma.consultantExpertise.findMany({
      skip: offset,
      take: limit,
      select: {
        consultantId: true,
        expertiseId: true,
      },
    });

    return consultantExpertise.map((item) => ({
      id: `${item.consultantId}-${item.expertiseId}`,
      consultantId: item.consultantId,
      expertiseId: item.expertiseId,
    }));
  }

  async count(): Promise<number> {
    const total = await prisma.consultantExpertise.count();
    return total;
  }
}
