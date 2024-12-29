import { Bonus } from '@prisma/client';
import { CreateBonusDTO, UpdateBonusDTO } from '../dtos/bonusDTO';

export interface IBonusRepository {
  create(data: CreateBonusDTO): Promise<Bonus>;
  update(id: string, data: UpdateBonusDTO): Promise<Bonus>;
  getAll(): Promise<Bonus[]>;
  getById(id: string): Promise<Bonus | null>;
  delete(id: string): Promise<boolean>;
  findAllWithPagination(limit: number, offset: number): Promise<Bonus[]>;
  countBonus(): Promise<number>;
}
