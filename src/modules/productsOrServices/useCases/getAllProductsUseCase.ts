import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import { ProductOrServiceDTO } from '../dtos/productsOrServicesDTO';

@injectable()
export class GetAllProductsUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const productsOrServices: ProductOrServiceDTO[] =
      await this.productOrServiceRepository.findAllProducts(limit, offset);

    const total = await this.productOrServiceRepository.countProductOrService();

    return {
      data: productsOrServices,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
