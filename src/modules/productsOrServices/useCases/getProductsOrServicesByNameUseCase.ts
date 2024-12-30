import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import { ProductOrServiceDTO } from '../dtos/productsOrServicesDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetProductsOrServicesByNameUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(name: string): Promise<ProductOrServiceDTO[]> {
    const result = await this.productOrServiceRepository.findByName(name);

    if (result.length === 0) {
      throw new ResourceNotFoundError(
        `No products or services found with the name: ${name}`,
      );
    }

    return result;
  }
}
