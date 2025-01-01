import {
  Budget,
  BudgetItem,
  PaymentPlan,
  Document,
  BudgetHistory,
  BudgetStatus,
} from '@prisma/client';
import { IBudgetRepository } from '../IBudgetRepository';
import {
  BudgetItemDTO,
  CreateBudgetDTO,
  CreateDocumentInputDTO,
  DocumentInputDTO,
  UpdateBudgetDTO,
} from '../../dtos/budgetDTO';
import { prisma } from '@/lib/prisma';

export class BudgetRepository implements IBudgetRepository {
  async createBudget(createBudgetDTO: CreateBudgetDTO): Promise<Budget> {
    const { items, budgetNumber, ...budgetData } = createBudgetDTO;

    const createdBudget = await prisma.budget.create({
      data: {
        ...budgetData,
        budgetNumber,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
          })),
        },
      },

      include: {
        items: true,
      },
    });

    return createdBudget;
  }

  async updateBudget(
    budgetId: string,
    updateBudgetDTO: UpdateBudgetDTO,
  ): Promise<Budget | null> {
    const itemsData = updateBudgetDTO.items
      ? {
          upsert: updateBudgetDTO.items.map((item) => ({
            where: {
              productId_budgetId: { productId: item.productId, budgetId },
            },
            create: {
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.quantity * item.unitPrice,
            },
            update: {
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.quantity * item.unitPrice,
            },
          })),
        }
      : undefined;

    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId },
      data: {
        ...updateBudgetDTO,
        bonusId: updateBudgetDTO.bonusId ?? null,
        items: itemsData,
      },
    });

    return updatedBudget;
  }

  async deleteBudget(budgetId: string): Promise<void> {
    await prisma.budget.delete({
      where: { id: budgetId },
    });
  }

  async getBudgetById(budgetId: string): Promise<Budget | null> {
    const budget = await prisma.budget.findUnique({
      where: { id: budgetId },
      include: {
        items: true,
      },
    });

    return budget;
  }

  async getBudgetsByUserId(userId: string): Promise<Budget[]> {
    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: {
        items: true,
      },
    });

    return budgets;
  }

  async getBudgetsByClientId(clientId: string): Promise<Budget[]> {
    const budgets = await prisma.budget.findMany({
      where: { clientId },
    });

    return budgets;
  }

  async addItemToBudget(
    budgetId: string,
    budgetItem: BudgetItemDTO,
  ): Promise<BudgetItem> {
    const totalPrice = budgetItem.quantity * budgetItem.unitPrice;

    const budgetItems = await prisma.budgetItem.create({
      data: {
        ...budgetItem,
        budgetId,
        totalPrice,
      },
    });

    return budgetItems;
  }

  async removeItemFromBudget(budgetId: string, itemId: string): Promise<void> {
    await prisma.budgetItem.delete({
      where: { id: itemId },
    });
  }

  async getItemsByBudgetId(budgetId: string): Promise<BudgetItem[]> {
    const items = await prisma.budgetItem.findMany({
      where: { budgetId },
    });

    return items;
  }

  async getPaymentPlansByBudgetId(budgetId: string): Promise<PaymentPlan[]> {
    const paymentPlans = await prisma.paymentPlan.findMany({
      where: { budgetId },
    });

    return paymentPlans;
  }

  async addDocumentToBudget(
    budgetId: string,
    documentData: DocumentInputDTO,
  ): Promise<Document> {
    const newDocument = await prisma.document.create({
      data: {
        fileName: documentData.fileName,
        filePath: documentData.filePath,
        fileType: documentData.fileType,
        budgetId,
      },
    });

    return newDocument;
  }

  async updateBudgetStatus(
    budgetId: string,
    status: BudgetStatus,
  ): Promise<Budget> {
    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId },
      data: { status },
    });

    return updatedBudget;
  }

  async getBudgetHistory(budgetId: string): Promise<BudgetHistory[]> {
    const history = await prisma.budgetHistory.findMany({
      where: { budgetId },
    });

    return history;
  }

  async addBudgetHistory(
    budgetId: string,
    description: string,
    userId: string,
    changeType: string,
  ): Promise<void> {
    await prisma.budgetHistory.create({
      data: {
        budgetId,
        description,
        changedById: userId,
        changeType,
      },
    });
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<Budget[]> {
    const budgets = await prisma.budget.findMany({
      skip: offset,
      take: limit,
    });
    return budgets;
  }

  async countBudgets(): Promise<number> {
    const total = await prisma.budget.count();
    return total;
  }

  async findPaginatedByUserId(
    userId: string,
    page: number,
    limit: number,
    filters?: {
      clientId?: string;
      status?: BudgetStatus;
      startDate?: Date;
      endDate?: Date;
    },
  ): Promise<{ data: Budget[]; total: number }> {
    const [data, total] = await Promise.all([
      prisma.budget.findMany({
        where: {
          userId,
          clientId: filters?.clientId,
          status: filters?.status,
          createdAt: {
            gte: filters?.startDate,
            lte: filters?.endDate,
          },
        },
        include: {
          items: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.budget.count({
        where: {
          userId,
          clientId: filters?.clientId,
          status: filters?.status,
          createdAt: {
            gte: filters?.startDate,
            lte: filters?.endDate,
          },
        },
      }),
    ]);

    return { data: data || [], total };
  }

  async findPaginatedByClientId(
    clientId: string,
    page: number,
    limit: number,
    filters?: {
      status?: BudgetStatus;
      startDate?: Date;
      endDate?: Date;
    },
  ): Promise<{ data: (Budget & { items: BudgetItem[] })[]; total: number }> {
    const [data, total] = await Promise.all([
      prisma.budget.findMany({
        where: {
          clientId,
          status: filters?.status,
          createdAt: {
            gte: filters?.startDate,
            lte: filters?.endDate,
          },
        },
        include: {
          items: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.budget.count({
        where: {
          clientId,
          status: filters?.status,
          createdAt: {
            gte: filters?.startDate,
            lte: filters?.endDate,
          },
        },
      }),
    ]);

    return { data, total };
  }

  async createDocument(data: CreateDocumentInputDTO): Promise<Document> {
    return prisma.document.create({
      data,
    });
  }
}
