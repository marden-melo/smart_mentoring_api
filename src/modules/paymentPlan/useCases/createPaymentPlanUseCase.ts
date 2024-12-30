import { injectable, inject } from 'tsyringe';
import { PaymentPlanRepository } from '../repositories/prisma/paymentPlanRepository';
import { CreatePaymentPlanDTO } from '../dtos/paymentPlanDTO';

@injectable()
export class CreatePaymentPlanUseCase {
  constructor(
    @inject('PaymentPlanRepository')
    private paymentPlanRepository: PaymentPlanRepository,
  ) {}

  async execute(data: CreatePaymentPlanDTO) {
    return this.paymentPlanRepository.create(data);
  }
}
