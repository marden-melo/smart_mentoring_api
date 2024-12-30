import {
  CreatePaymentPlanDTO,
  PaymentPlanDTO,
  UpdatePaymentPlanDTO,
} from '../dtos/paymentPlanDTO';

export interface IPaymentPlanRepository {
  create(data: CreatePaymentPlanDTO): Promise<PaymentPlanDTO>;
  update(data: UpdatePaymentPlanDTO): Promise<PaymentPlanDTO>;
  findByBudgetId(budgetId: string): Promise<PaymentPlanDTO[]>;
  findById(id: string): Promise<PaymentPlanDTO | null>;
}
