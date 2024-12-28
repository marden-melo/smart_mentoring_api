import { injectable, inject } from 'tsyringe';
import { CategoryRepository } from '../repositories/prisma/categoryRepository';
import { CategoryDTO, CategoryUseCaseResponse } from '../dtos/categoryDTO';
import { BadRequestError } from '@/utils/errors/badRequestError';

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}

  async execute({
    name,
    description,
  }: CategoryDTO): Promise<CategoryUseCaseResponse> {
    const existingCategory = await this.categoryRepository.findByName(name);

    if (existingCategory) {
      throw new BadRequestError('Category name already exists.');
    }

    const category = await this.categoryRepository.create({
      name,
      description,
    });

    return {
      data: category,
    };
  }
}
