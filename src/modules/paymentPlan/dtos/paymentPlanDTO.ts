export interface CreatePaymentPlanDTO {
  description: string;
  value: number;
  monthlyFee?: number;
  contractTerm?: number;
  budgetId: string;
}

export interface UpdatePaymentPlanDTO {
  id: string;
  description?: string;
  value?: number;
  monthlyFee?: number;
  contractTerm?: number;
  budgetId?: string;
}

export interface PaymentPlanDTO {
  id: string;
  description: string;
  value: number;
  monthlyFee?: number | null;
  contractTerm?: number | null;
  budgetId: string;
}
