import {
  CreateProductOrServiceDTO,
  ProductOrServiceDTO,
  ProductOrServiceResponseDTO,
  UpdateProductOrServiceDTO,
} from '../dtos/productsOrServicesDTO';

export interface IProductOrServiceRepository {
  create(data: CreateProductOrServiceDTO): Promise<ProductOrServiceDTO>;
  findById(id: string): Promise<ProductOrServiceResponseDTO | null>;
  findAll(): Promise<ProductOrServiceDTO[]>;
  update(data: UpdateProductOrServiceDTO): Promise<ProductOrServiceDTO>;
  delete(id: string): Promise<void>;
  findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]>;
  countByType(type: 'PRODUCT' | 'SERVICE'): Promise<number>;
  findByTypeWithPagination(
    type: 'PRODUCT' | 'SERVICE',
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]>;
  findByCategory(categoryId: string): Promise<ProductOrServiceDTO[]>;
  findByName(name: string): Promise<ProductOrServiceDTO[]>;
  countProductOrService(): Promise<number>;
  findAllProducts(
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]>;
  findAllServices(
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]>;
}
