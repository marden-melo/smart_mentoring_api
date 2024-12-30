import { injectable, inject } from 'tsyringe';
import { PaymentPlanRepository } from '../repositories/prisma/paymentPlanRepository';
import { PaymentPlanDTO } from '../dtos/paymentPlanDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetPaymentPlanByBudgetIdUseCase {
  constructor(
    @inject('PaymentPlanRepository')
    private paymentPlanRepository: PaymentPlanRepository,
  ) {}

  async execute(budgetId: string): Promise<PaymentPlanDTO[]> {
    const paymentPlans =
      await this.paymentPlanRepository.findByBudgetId(budgetId);

    if (!paymentPlans || paymentPlans.length === 0) {
      throw new ResourceNotFoundError('Payment plan not find for this Budget.');
    }

    return paymentPlans;
  }
}
