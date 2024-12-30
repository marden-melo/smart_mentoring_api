import { z } from 'zod';

export const createPaymentPlanSchema = z.object({
  budgetId: z.string().uuid(),
  description: z.string().min(1),
  value: z.number().positive(),
  monthlyFee: z.number().optional(),
  contractTerm: z.number().optional(),
});

export const updatePaymentPlanSchema = z.object({
  budgetId: z.string().uuid().optional(),
  description: z.string().min(1).optional(),
  value: z.number().positive().optional(),
  monthlyFee: z.number().optional(),
  contractTerm: z.number().optional(),
});
