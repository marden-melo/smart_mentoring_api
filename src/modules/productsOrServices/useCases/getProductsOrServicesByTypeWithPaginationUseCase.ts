import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import {
  ProductOrServiceDTO,
  ProductType,
} from '../dtos/productsOrServicesDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetProductsOrServicesByTypeWithPaginationUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(
    type: ProductType,
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]> {
    const result =
      await this.productOrServiceRepository.findByTypeWithPagination(
        type,
        limit,
        offset,
      );

    if (result.length === 0) {
      throw new ResourceNotFoundError(`No products found for type ${type}`);
    }

    return result;
  }
}
