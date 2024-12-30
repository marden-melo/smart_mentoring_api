import { injectable, inject } from 'tsyringe';
import { ProductOrServiceRepository } from '../repositories/prisma/productOrServiceRepository';
import {
  ProductOrServiceDTO,
  UpdateProductOrServiceDTO,
} from '../dtos/productsOrServicesDTO';

@injectable()
export class UpdateProductOrServiceUseCase {
  constructor(
    @inject('ProductOrServiceRepository')
    private productOrServiceRepository: ProductOrServiceRepository,
  ) {}

  async execute(data: UpdateProductOrServiceDTO): Promise<ProductOrServiceDTO> {
    const result = await this.productOrServiceRepository.update(data);
    return result;
  }
}
