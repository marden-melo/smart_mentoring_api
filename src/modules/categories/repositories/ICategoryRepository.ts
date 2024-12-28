import { Category } from '@prisma/client';
import { CategoryDTO, UpdateCategoryDTO } from '../dtos/categoryDTO';

export interface ICategoryRepository {
  create(data: CategoryDTO): Promise<Category>;
  update(id: string, data: UpdateCategoryDTO): Promise<Category>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category | null>;
  findAllWithPagination(limit: number, offset: number): Promise<Category[]>;
  countCategories(): Promise<number>;
}
