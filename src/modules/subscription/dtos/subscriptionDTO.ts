import { PaymentInterval, SubscriptionStatus } from '@prisma/client';

export interface CreateSubscriptionDTO {
  userId: string;
  planId: string;
  startDate?: Date;
  endDate?: Date | null;
  isActive?: boolean;
  autoRenew?: boolean;
  status?: SubscriptionStatus;
  renewalDate?: Date | null;
  cancellationDate?: Date | null;
  trialEndDate?: Date | null;
  lastPaymentDate?: Date | null;
  nextPaymentDate?: Date | null;
  paymentInterval?: PaymentInterval | null;
  paymentGateway?: string | null;
  externalReference?: string;
}

export interface SubscriptionDTO {
  id: string;
  userId: string;
  planId: string;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  autoRenew: boolean;
  status: SubscriptionStatus;
  renewalDate: Date | null;
  cancellationDate: Date | null;
  trialEndDate: Date | null;
  lastPaymentDate: Date | null;
  nextPaymentDate: Date | null;
  paymentInterval: PaymentInterval;
  paymentGateway: string | null;
  externalReference: string | null;
}

export interface UpdateSubscriptionDTO {
  id: string;
  userId?: string;
  planId?: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  autoRenew?: boolean;
  status?: SubscriptionStatus;
  renewalDate: Date | null;
  cancellationDate: Date | null;
  trialEndDate: Date | null;
  lastPaymentDate: Date | null;
  nextPaymentDate: Date | null;
  paymentInterval: PaymentInterval;
  paymentGateway: string | null;
  externalReference: string | null;
}
