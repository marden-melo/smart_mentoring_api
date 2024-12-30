export interface CreateSubscriptionHistoryDTO {
  subscriptionId: string;
  oldPlanId: string;
  newPlanId: string;
  changedAt: string;
}

export interface UpdateSubscriptionHistoryDTO {
  oldPlanId?: string;
  newPlanId?: string;
  changedAt: Date;
}

export interface SubscriptionHistoryDTO {
  id: string;
  subscriptionId: string;
  oldPlanId: string;
  newPlanId: string;
  changedAt: Date;
}
