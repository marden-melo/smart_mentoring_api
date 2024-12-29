import { Bonus } from '@prisma/client';
import { IBonusRepository } from '../IBonusRepository';
import { CreateBonusDTO, UpdateBonusDTO } from '../../dtos/bonusDTO';
import { prisma } from '@/lib/prisma';

export class BonusRepository implements IBonusRepository {
  async create(data: CreateBonusDTO): Promise<Bonus> {
    return await prisma.bonus.create({
      data: {
        description: data.description,
        percentage: data.percentage,
        value: data.value,
      },
    });
  }

  async update(id: string, data: UpdateBonusDTO): Promise<Bonus> {
    return prisma.bonus.update({
      where: { id },
      data,
    });
  }

  async getAll(): Promise<Bonus[]> {
    return await prisma.bonus.findMany();
  }

  async getById(id: string): Promise<Bonus | null> {
    return await prisma.bonus.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.bonus.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting bonus:', error);
      return false;
    }
  }

  async findAllWithPagination(limit: number, offset: number): Promise<Bonus[]> {
    const bonus = await prisma.bonus.findMany({
      skip: offset,
      take: limit,
    });
    return bonus;
  }
  async countBonus(): Promise<number> {
    const total = await prisma.bonus.count();
    return total;
  }
}
