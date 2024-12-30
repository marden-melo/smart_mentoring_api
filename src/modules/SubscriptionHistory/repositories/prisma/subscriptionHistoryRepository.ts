import { ISubscriptionHistoryRepository } from '../ISubscriptionHistoryRepository';
import { prisma } from '@/lib/prisma';

import { SubscriptionHistory } from '@prisma/client';
import {
  CreateSubscriptionHistoryDTO,
  SubscriptionHistoryDTO,
  UpdateSubscriptionHistoryDTO,
} from '../../dtos/subscriptionHistoryDTO';

export class SubscriptionHistoryRepository
  implements ISubscriptionHistoryRepository
{
  async create(
    data: CreateSubscriptionHistoryDTO,
  ): Promise<SubscriptionHistoryDTO> {
    const subscriptionHistory = await prisma.subscriptionHistory.create({
      data: {
        subscriptionId: data.subscriptionId,
        oldPlanId: data.oldPlanId,
        newPlanId: data.newPlanId,
        changedAt: data.changedAt,
      },
    });

    return {
      id: subscriptionHistory.id,
      subscriptionId: subscriptionHistory.subscriptionId,
      oldPlanId: subscriptionHistory.oldPlanId,
      newPlanId: subscriptionHistory.newPlanId,
      changedAt: subscriptionHistory.changedAt,
    };
  }

  async update(
    id: string,
    data: UpdateSubscriptionHistoryDTO,
  ): Promise<SubscriptionHistoryDTO> {
    const updatedSubscriptionHistory = await prisma.subscriptionHistory.update({
      where: { id },
      data: {
        oldPlanId: data.oldPlanId,
        newPlanId: data.newPlanId,
        changedAt: data.changedAt,
      },
    });

    return {
      id: updatedSubscriptionHistory.id,
      subscriptionId: updatedSubscriptionHistory.subscriptionId,
      oldPlanId: updatedSubscriptionHistory.oldPlanId,
      newPlanId: updatedSubscriptionHistory.newPlanId,
      changedAt: updatedSubscriptionHistory.changedAt,
    };
  }

  async findBySubscriptionId(
    subscriptionId: string,
  ): Promise<SubscriptionHistory[]> {
    const subscriptionHistories = await prisma.subscriptionHistory.findMany({
      where: { subscriptionId },
    });
    return subscriptionHistories;
  }

  async findById(id: string): Promise<SubscriptionHistoryDTO | null> {
    return await prisma.subscriptionHistory.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.subscriptionHistory.delete({
      where: { id },
    });
  }
}
