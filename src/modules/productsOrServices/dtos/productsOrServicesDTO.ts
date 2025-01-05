import { Product } from '@prisma/client';

export type ProductType = 'PRODUCT' | 'SERVICE';

export interface CreateProductOrServiceDTO {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  type: ProductType;
  quantity: number;
}

export interface UpdateProductOrServiceDTO {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  type?: ProductType;
  quantity?: number;
}

export interface ProductOrServiceDTO {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  categoryId: string;
  type: ProductType;
  quantity: number;
}

export interface ProductOrServiceResponseDTO {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category: {
    id: string;
    name: string;
  };
  type: ProductType;
  quantity: number;
}
