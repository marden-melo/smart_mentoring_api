import { BudgetStatus, PaymentType } from '@prisma/client';
import { z } from 'zod';

export const createBudgetSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z
    .enum([BudgetStatus.PENDING, BudgetStatus.APPROVED, BudgetStatus.REJECTED])
    .optional(),
  discountPercent: z.number().optional(),
  discountValue: z.number().optional(),
  subTotal: z.number().optional(),
  total: z.number().optional(),
  paymentType: z.enum([
    PaymentType.PIX,
    PaymentType.CREDIT_CARD,
    PaymentType.DEBIT_CARD,
    PaymentType.BOLETO,
    PaymentType.CASH,
  ]),
  installments: z.number().optional(),
  additionalNotes: z.string().optional(),
  clientId: z.string(),
  bonusId: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    }),
  ),
  budgetNumber: z.string(),
  userId: z.string(),
});

export const updateBudgetSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z
    .enum([BudgetStatus.PENDING, BudgetStatus.APPROVED, BudgetStatus.REJECTED])
    .optional(),
  discountPercent: z.number().optional(),
  discountValue: z.number().optional(),
  subTotal: z.number().optional(),
  total: z.number().optional(),
  paymentType: z
    .enum([
      PaymentType.PIX,
      PaymentType.CREDIT_CARD,
      PaymentType.DEBIT_CARD,
      PaymentType.BOLETO,
      PaymentType.CASH,
    ])
    .optional(),
  installments: z.number().optional(),
  additionalNotes: z.string().optional(),
  clientId: z.string().optional(),
  bonusId: z.string().nullable().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
      }),
    )
    .optional(),
  budgetNumber: z.string().optional(),
});
