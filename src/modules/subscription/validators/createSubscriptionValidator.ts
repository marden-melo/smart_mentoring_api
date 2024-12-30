import { z } from 'zod';
import { SubscriptionStatus } from '@prisma/client';

export const createSubscriptionSchema = z.object({
  userId: z.string().uuid({ message: 'User ID must be a valid UUID' }),
  planId: z.string().uuid({ message: 'Plan ID must be a valid UUID' }),
  startDate: z.string().transform((val) => new Date(val)),
  endDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : null))
    .nullable(),
  isActive: z.boolean().optional(),
  autoRenew: z.boolean().optional(),
  status: z
    .enum(['ACTIVE', 'INACTIVE', 'CANCELLED'], {
      message: 'Invalid subscription status',
    })
    .optional(),
  renewalDate: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
  cancellationDate: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
  trialEndDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
  lastPaymentDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
  nextPaymentDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : null)),
  paymentInterval: z
    .enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'])
    .nullable()
    .optional(),
  paymentGateway: z.string().nullable().optional(),
  externalReference: z.string().optional(),
});

export type CreateSubscriptionDTO = z.infer<typeof createSubscriptionSchema>;

export const updateSubscriptionSchema = z.object({
  id: z.string().uuid({ message: 'Subscription ID must be a valid UUID' }),
  userId: z.string().uuid().optional(),
  planId: z.string().uuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isActive: z.boolean().optional(),
  autoRenew: z.boolean().optional(),
  status: z.nativeEnum(SubscriptionStatus).optional(),
  renewalDate: z.date().nullable().optional(),
  cancellationDate: z.date().nullable().optional(),
  trialEndDate: z.date().nullable().optional(),
  lastPaymentDate: z.date().nullable().optional(),
  nextPaymentDate: z.date().nullable().optional(),
  paymentInterval: z
    .enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'])
    .nullable()
    .optional(),
  paymentGateway: z.string().nullable().optional(),
  externalReference: z.string().optional(),
});

export type UpdateSubscriptionDTO = z.infer<typeof updateSubscriptionSchema>;

export const subscriptionSchema = z.object({
  id: z.string().uuid({ message: 'Subscription ID must be a valid UUID' }),
  userId: z.string().uuid().optional(),
  planId: z.string().uuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().nullable().optional(),
  isActive: z.boolean().optional(),
  autoRenew: z.boolean().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'CANCELLED']).optional(),
  renewalDate: z.date().nullable().optional(),
  cancellationDate: z.date().nullable().optional(),
  trialEndDate: z.date().nullable().optional(),
  lastPaymentDate: z.date().nullable().optional(),
  nextPaymentDate: z.date().nullable().optional(),
  paymentInterval: z
    .enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'])
    .nullable()
    .optional(),
  paymentGateway: z.string().nullable().optional(),
  externalReference: z.string().nullable().optional(),
});

export type SubscriptionDTO = z.infer<typeof subscriptionSchema>;

export const idSchema = z.object({
  id: z.string().uuid(),
});
