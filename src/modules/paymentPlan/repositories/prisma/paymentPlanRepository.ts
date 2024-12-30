import { IPaymentPlanRepository } from '../IPaymentPlanRepository';
import { prisma } from '@/lib/prisma';
import {
  CreatePaymentPlanDTO,
  PaymentPlanDTO,
  UpdatePaymentPlanDTO,
} from '../../dtos/paymentPlanDTO';

export class PaymentPlanRepository implements IPaymentPlanRepository {
  async findById(id: string): Promise<PaymentPlanDTO | null> {
    const paymentPlan = await prisma.paymentPlan.findUnique({
      where: { id },
    });
    return paymentPlan;
  }
  async create(data: CreatePaymentPlanDTO): Promise<PaymentPlanDTO> {
    return prisma.paymentPlan.create({
      data,
    });
  }

  async update(data: UpdatePaymentPlanDTO): Promise<PaymentPlanDTO> {
    const { id, ...updateData } = data;
    const updatedPaymentPlan = await prisma.paymentPlan.update({
      where: { id },
      data: updateData,
    });
    return updatedPaymentPlan;
  }

  async findByBudgetId(budgetId: string): Promise<PaymentPlanDTO[]> {
    const paymentPlans = await prisma.paymentPlan.findMany({
      where: { budgetId },
    });
    return paymentPlans;
  }
}
