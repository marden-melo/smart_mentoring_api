import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import { CreateProductOrServiceDTO } from '../dtos/productsOrServicesDTO';

@injectable()
export class CreateProductOrServiceUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(data: CreateProductOrServiceDTO) {
    const productOrService = await this.productOrServiceRepository.create(data);

    return {
      data: productOrService,
    };
  }
}
