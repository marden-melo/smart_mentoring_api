import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { CategoryRepository } from '../repositories/prisma/categoryRepository';

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new ResourceNotFoundError();
    }

    await this.categoryRepository.delete(id);
  }
}
