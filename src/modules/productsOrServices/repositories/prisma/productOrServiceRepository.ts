import { IProductOrServiceRepository } from '../IProductOrServiceRepository';
import { prisma } from '@/lib/prisma';
import {
  CreateProductOrServiceDTO,
  ProductOrServiceDTO,
  UpdateProductOrServiceDTO,
} from '../../dtos/productsOrServicesDTO';
import { ProductType } from '@prisma/client';

export class ProductOrServiceRepository implements IProductOrServiceRepository {
  async create(data: CreateProductOrServiceDTO): Promise<ProductOrServiceDTO> {
    return prisma.product.create({
      data,
    });
  }

  async findById(id: string): Promise<ProductOrServiceDTO | null> {
    const productOrService = await prisma.product.findUnique({ where: { id } });
    return productOrService;
  }

  async countByType(type: 'PRODUCT' | 'SERVICE'): Promise<number> {
    const count = await prisma.product.count({
      where: { type },
    });
    return count;
  }

  async findByTypeWithPagination(
    type: ProductType,
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]> {
    const items = await prisma.product.findMany({
      where: { type },
      skip: offset,
      take: limit,
    });
    return items.map((item) => item);
  }

  async findByCategory(categoryId: string): Promise<ProductOrServiceDTO[]> {
    const items = await prisma.product.findMany({ where: { categoryId } });
    return items.map((item) => item);
  }

  async findByName(name: string): Promise<ProductOrServiceDTO[]> {
    const productsOrServices = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
    return productsOrServices.map((item) => item);
  }

  async findAll(): Promise<ProductOrServiceDTO[]> {
    const productsOrServices = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return productsOrServices.map((item) => ({
      ...item,
      category: item.category,
    }));
  }

  async update(data: UpdateProductOrServiceDTO): Promise<ProductOrServiceDTO> {
    const { id, ...updateData } = data;
    const updatedProductOrService = await prisma.product.update({
      where: { id },
      data: updateData,
    });
    return updatedProductOrService;
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]> {
    const productsOrServices = await prisma.product.findMany({
      skip: offset,
      take: limit,
      include: {
        category: true,
      },
    });
    return productsOrServices.map((item) => ({
      ...item,
      category: item.category,
    }));
  }

  async countProductOrService(): Promise<number> {
    const count = await prisma.product.count();
    return count;
  }

  async findAllProducts(
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]> {
    const products = await prisma.product.findMany({
      where: { type: 'PRODUCT' },
      skip: offset,
      take: limit,
    });
    return products.map((item) => item);
  }

  async findAllServices(
    limit: number,
    offset: number,
  ): Promise<ProductOrServiceDTO[]> {
    const services = await prisma.product.findMany({
      where: { type: 'SERVICE' },
      skip: offset,
      take: limit,
    });
    return services.map((item) => item);
  }
}
