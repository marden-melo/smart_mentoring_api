import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';

@injectable()
export class DeleteProductOrServiceUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const productOrService = await this.productOrServiceRepository.findById(id);

    if (!productOrService) {
      throw new ResourceNotFoundError();
    }

    await this.productOrServiceRepository.delete(id);
  }
}
