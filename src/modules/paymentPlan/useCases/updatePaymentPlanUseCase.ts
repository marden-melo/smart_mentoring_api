import { injectable, inject } from 'tsyringe';
import { PaymentPlanRepository } from '../repositories/prisma/paymentPlanRepository';
import { PaymentPlanDTO, UpdatePaymentPlanDTO } from '../dtos/paymentPlanDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class UpdatePaymentPlanUseCase {
  constructor(
    @inject('PaymentPlanRepository')
    private paymentPlanRepository: PaymentPlanRepository,
  ) {}

  async execute(
    id: string,
    data: UpdatePaymentPlanDTO,
  ): Promise<PaymentPlanDTO> {
    const paymentPlan = await this.paymentPlanRepository.findById(id);
    if (!paymentPlan) {
      throw new ResourceNotFoundError('Payment plan not found.');
    }

    const updatedPaymentPlan = await this.paymentPlanRepository.update({
      ...data,
    });

    return updatedPaymentPlan;
  }
}
