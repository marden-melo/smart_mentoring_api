import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class CountProductOrServiceUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(): Promise<number> {
    const count = await this.productOrServiceRepository.countProductOrService();

    if (count === 0) {
      throw new ResourceNotFoundError();
    }

    return count;
  }
}
