import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class CountProductsOrServicesByTypeUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(type: 'PRODUCT' | 'SERVICE'): Promise<number> {
    const count = await this.productOrServiceRepository.countByType(type);

    if (count === 0) {
      throw new ResourceNotFoundError(
        `No products or services found for type ${type}`,
      );
    }

    return count;
  }
}
