import { PaymentType, BudgetStatus } from '@prisma/client';

export interface CreateBudgetDTO {
  title: string;
  description?: string;
  status?: BudgetStatus;
  discountPercent?: number;
  discountValue?: number;
  subTotal?: number;
  total?: number;
  paymentType: PaymentType;
  installments?: number;
  additionalNotes?: string;
  clientId: string;
  bonusId?: string;
  items: BudgetItemDTO[];
  budgetNumber: string;
  userId: string;
  documents?: CreateDocumentInputDTO[];
}

export interface BudgetItemDTO {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface DocumentInputDTO {
  id?: string;
  fileName: string;
  filePath: string;
  fileType: string;
}

export interface CreateDocumentInputDTO {
  budgetId: string;
  fileName: string;
  fileType: string;
  filePath: string;
}

export interface UpdateBudgetDTO {
  title?: string;
  description?: string;
  status?: BudgetStatus;
  discountPercent?: number;
  discountValue?: number;
  subTotal?: number;
  total?: number;
  paymentType?: PaymentType;
  installments?: number;
  additionalNotes?: string;
  clientId?: string;
  bonusId?: string | null;
  items?: BudgetItemDTO[];
  budgetNumber?: string;
  documents?: DocumentInputDTO[];
}

export interface BudgetFilterDTO {
  status?: BudgetStatus;
  clientId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateDocumentInputDTO {
  budgetId: string;
  fileName: string;
  filePath: string;
  fileType: string;
}

export interface DocumentInputDTO {
  fileName: string;
  filePath: string;
  fileType: string;
}

export interface AddBudgetHistoryRequestBodyDTO {
  budgetId: string;
  description: string;
  userId: string;
  changeType: string;
}

export interface AddItemToBudgetRequestBodyDTO {
  budgetId: string;
  budgetItem: {
    productId: string;
    quantity: number;
    unitPrice: number;
  };
}

export interface GetBudgetsQueryDTO {
  clientId: string;
  page: number;
  limit: number;
}

export interface GetBudgetsUserQueryDTO {
  userId: string;
  page: number;
  limit: number;
}
