import { z } from 'zod';

export const createCustomFieldSchema = z.object({
  name: z.string().min(1, 'O nome do campo é obrigatório'),
  value: z.string().min(1, 'O valor do campo é obrigatório'),
  budgetId: z.string().min(1, 'O ID do orçamento é obrigatório'),
});

export const updateCustomFieldSchema = z.object({
  name: z.string().optional(),
  value: z.string().optional(),
});
