import { z } from 'zod';

export const createProductOrServiceSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  categoryId: z.string().min(1, { message: 'Category ID is required' }),
  type: z.enum(['PRODUCT', 'SERVICE']),
  quantity: z.number().min(0, { message: 'Quantity cannot be negative' }),
});

export type CreateProductOrServiceDTO = z.infer<
  typeof createProductOrServiceSchema
>;

export const idSchema = z.object({
  id: z.string().uuid(),
});

export const productOrServiceSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  quantity: z.number().int().min(0).optional(),
  type: z.string().optional(),
  description: z.string().optional(),
});
