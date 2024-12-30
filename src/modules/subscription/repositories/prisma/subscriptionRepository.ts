import { ISubscriptionRepository } from '../ISubscriptionRepository';
import { prisma } from '@/lib/prisma';
import {
  CreateSubscriptionDTO,
  SubscriptionDTO,
  UpdateSubscriptionDTO,
} from '../../dtos/subscriptionDTO';
import {
  PaymentInterval,
  Subscription,
  SubscriptionStatus,
} from '@prisma/client';

export class SubscriptionRepository implements ISubscriptionRepository {
  async create(data: CreateSubscriptionDTO): Promise<SubscriptionDTO> {
    const subscription = await prisma.subscription.create({
      data: {
        ...data,
        startDate: data.startDate || new Date(),
        status: data.status || SubscriptionStatus.ACTIVE,
        paymentInterval: data.paymentInterval || PaymentInterval.MONTHLY,
      },
    });

    return {
      id: subscription.id,
      userId: subscription.userId,
      planId: subscription.planId,
      startDate: subscription.startDate,
      endDate: subscription.endDate ?? null,
      isActive: subscription.isActive,
      autoRenew: subscription.autoRenew,
      status: subscription.status,
      renewalDate: subscription.renewalDate ?? null,
      cancellationDate: subscription.cancellationDate ?? null,
      trialEndDate: subscription.trialEndDate ?? null,
      lastPaymentDate: subscription.lastPaymentDate ?? null,
      nextPaymentDate: subscription.nextPaymentDate ?? null,
      paymentInterval: subscription.paymentInterval,
      paymentGateway: subscription.paymentGateway ?? null,
      externalReference: subscription.externalReference ?? null,
    };
  }

  async findById(id: string): Promise<SubscriptionDTO | null> {
    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });
    return subscription;
  }

  async findByUserId(userId: string): Promise<SubscriptionDTO[]> {
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
    });
    return subscriptions;
  }

  async update(
    id: string,
    data: UpdateSubscriptionDTO,
  ): Promise<SubscriptionDTO> {
    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: {
        planId: data.planId,
        startDate: data.startDate,
        endDate: data.endDate,
        isActive: data.isActive,
        autoRenew: data.autoRenew,
        status: data.status,
        renewalDate: data.renewalDate,
        cancellationDate: data.cancellationDate,
        trialEndDate: data.trialEndDate,
        lastPaymentDate: data.lastPaymentDate,
        nextPaymentDate: data.nextPaymentDate,
        paymentInterval: data.paymentInterval,
        paymentGateway: data.paymentGateway,
        externalReference: data.externalReference,
      },
    });

    return updatedSubscription;
  }

  async delete(id: string): Promise<void> {
    await prisma.subscription.delete({
      where: { id },
    });
  }

  async findActiveSubscriptions(): Promise<SubscriptionDTO[]> {
    const activeSubscriptions = await prisma.subscription.findMany({
      where: { isActive: true },
    });
    return activeSubscriptions;
  }
}
