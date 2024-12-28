import { injectable, inject } from 'tsyringe';
import { CategoryRepository } from '../repositories/prisma/categoryRepository';
import { Category, Permission } from '@prisma/client';

@injectable()
export class GetAllCategoriessUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const users: Category[] =
      await this.categoryRepository.findAllWithPagination(limit, offset);
    const total = await this.categoryRepository.countCategories();

    return {
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
