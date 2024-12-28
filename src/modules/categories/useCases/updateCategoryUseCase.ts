import { injectable, inject } from 'tsyringe';
import { Category, Permission, Role } from '@prisma/client';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { CategoryRepository } from '../repositories/prisma/categoryRepository';
import { UpdateCategoryDTO } from '../dtos/categoryDTO';

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ResourceNotFoundError('Category not found');
    }

    return this.categoryRepository.update(id, data);
  }
}
