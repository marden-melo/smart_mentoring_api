import {
  Budget,
  BudgetItem,
  PaymentPlan,
  Document,
  Client,
  BudgetStatus,
  BudgetHistory,
} from '@prisma/client';
import {
  BudgetItemDTO,
  CreateBudgetDTO,
  CreateDocumentInputDTO,
  UpdateBudgetDTO,
} from '../dtos/budgetDTO';

export interface IBudgetRepository {
  createBudget(createBudgetDTO: CreateBudgetDTO): Promise<Budget>;
  updateBudget(
    budgetId: string,
    updateBudgetDTO: UpdateBudgetDTO,
  ): Promise<Budget | null>;
  deleteBudget(budgetId: string): Promise<void>;
  getBudgetById(budgetId: string): Promise<Budget | null>;
  getBudgetsByUserId(userId: string): Promise<Budget[]>;
  getBudgetsByClientId(clientId: string): Promise<Budget[]>;
  addItemToBudget(
    budgetId: string,
    budgetItemDTO: BudgetItemDTO,
  ): Promise<BudgetItem>;
  removeItemFromBudget(budgetId: string, itemId: string): Promise<void>;
  getItemsByBudgetId(budgetId: string): Promise<BudgetItem[]>;
  getPaymentPlansByBudgetId(budgetId: string): Promise<PaymentPlan[]>;
  addDocumentToBudget(budgetId: string, document: Document): Promise<Document>;
  createDocument(data: CreateDocumentInputDTO): Promise<Document>;
  updateBudgetStatus(budgetId: string, status: BudgetStatus): Promise<Budget>;
  getBudgetHistory(budgetId: string): Promise<BudgetHistory[]>;
  addBudgetHistory(
    budgetId: string,
    description: string,
    userId: string,
    changeType: string,
  ): Promise<void>;
  findAllWithPagination(limit: number, offset: number): Promise<Budget[]>;
  countBudgets(): Promise<number>;
  findPaginatedByUserId(
    userId: string,
    page: number,
    limit: number,
    filters?: {
      clientId?: string;
      status?: BudgetStatus;
      startDate?: Date;
      endDate?: Date;
    },
  ): Promise<{ data: Budget[]; total: number }>;
  findPaginatedByClientId(
    clientId: string,
    page: number,
    limit: number,
    filters?: {
      status?: BudgetStatus;
      startDate?: Date;
      endDate?: Date;
    },
  ): Promise<{ data: Budget[]; total: number }>;
}
