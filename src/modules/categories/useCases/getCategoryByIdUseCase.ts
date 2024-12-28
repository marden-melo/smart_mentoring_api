import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { CategoryRepository } from '../repositories/prisma/categoryRepository';
import { CategoryWithIdDTO } from '../dtos/categoryDTO';

@injectable()
export class GetCategoryByIdUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string): Promise<{ data: CategoryWithIdDTO }> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ResourceNotFoundError();
    }

    return {
      data: category,
    };
  }
}
