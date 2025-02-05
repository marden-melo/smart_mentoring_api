import { ExpertiseArea } from '@prisma/client';
import { ExpertiseAreaDTO } from '../dtos/expertiseAreaDTO';

export interface IExpertiseAreaRepository {
  create(data: ExpertiseAreaDTO): Promise<ExpertiseArea>;
  update(id: string, data: ExpertiseAreaDTO): Promise<ExpertiseArea>;
  getAll(): Promise<ExpertiseArea[]>;
  getById(id: string): Promise<ExpertiseArea | null>;
  delete(id: string): Promise<boolean>;
  findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<ExpertiseArea[]>;
  count(): Promise<number>;
}
