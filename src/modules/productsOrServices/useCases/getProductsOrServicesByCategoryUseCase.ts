import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import { ProductOrServiceDTO } from '../dtos/productsOrServicesDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetProductsOrServicesByCategoryUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(categoryId: string): Promise<ProductOrServiceDTO[]> {
    const result =
      await this.productOrServiceRepository.findByCategory(categoryId);

    if (result.length === 0) {
      throw new ResourceNotFoundError(
        `No products or services found for category ${categoryId}`,
      );
    }

    return result;
  }
}
