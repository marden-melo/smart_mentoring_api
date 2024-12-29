import { z } from 'zod';

export const createBonusSchema = z.object({
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(255, { message: 'Description should not exceed 255 characters' }),
  percentage: z.number().optional(),
  value: z.number().optional(),
});

export type CreateBonusDTO = z.infer<typeof createBonusSchema>;
