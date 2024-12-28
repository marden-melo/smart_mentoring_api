import { prisma } from '@/lib/prisma';
import { ICategoryRepository } from '../ICategoryRepository';
import { CategoryDTO, UpdateCategoryDTO } from '../../dtos/categoryDTO';

export class CategoryRepository implements ICategoryRepository {
  async findByName(name: string) {
    return prisma.category.findUnique({
      where: { name },
    });
  }

  async create(data: CategoryDTO) {
    return prisma.category.create({
      data: {
        name: data.name,
        description: data.description || null,
      },
    });
  }

  async update(id: string, data: UpdateCategoryDTO) {
    return prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async delete(id: string) {
    await prisma.category.delete({
      where: { id: id },
    });
  }

  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return prisma.category.findMany();
  }

  async findAllWithPagination(limit: number, offset: number) {
    const permission = await prisma.category.findMany({
      skip: offset,
      take: limit,
    });
    return permission;
  }

  async countCategories() {
    const total = await prisma.category.count();
    return total;
  }
}
