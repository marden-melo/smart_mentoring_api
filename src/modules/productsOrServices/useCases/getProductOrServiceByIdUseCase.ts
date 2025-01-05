import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import { ProductOrServiceResponseDTO } from '../dtos/productsOrServicesDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetProductOrServiceByIdUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(id: string): Promise<ProductOrServiceResponseDTO | null> {
    const result = await this.productOrServiceRepository.findById(id);

    if (!result) {
      throw new ResourceNotFoundError();
    }

    return result;
  }
}
