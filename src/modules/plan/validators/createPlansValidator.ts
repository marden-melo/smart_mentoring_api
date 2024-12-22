import { z } from 'zod';

export const createPlansSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  price: z.number().positive('Price must be a positive number.'),
});
