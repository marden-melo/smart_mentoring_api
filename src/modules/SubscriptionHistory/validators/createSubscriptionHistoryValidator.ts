import { z } from 'zod';

export const createSubscriptionHistorySchema = z.object({
  subscriptionId: z.string().uuid(),
  oldPlanId: z.string().uuid(),
  newPlanId: z.string().uuid(),
  changedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
});

export type CreateSubscriptionHistorySchema = z.infer<
  typeof createSubscriptionHistorySchema
>;

export const updateSubscriptionHistorySchema = z.object({
  oldPlanId: z.string().uuid().optional(),
  newPlanId: z.string().uuid().optional(),
  changedAt: z.date(),
});

export type UpdateSubscriptionSchema = z.infer<
  typeof updateSubscriptionHistorySchema
>;

export const idSchema = z.object({
  id: z.string().uuid(),
});
