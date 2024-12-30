import { SubscriptionHistory } from '@prisma/client';
import {
  CreateSubscriptionHistoryDTO,
  SubscriptionHistoryDTO,
  UpdateSubscriptionHistoryDTO,
} from '../dtos/subscriptionHistoryDTO';

export interface ISubscriptionHistoryRepository {
  create(data: CreateSubscriptionHistoryDTO): Promise<SubscriptionHistoryDTO>;
  update(
    id: string,
    data: UpdateSubscriptionHistoryDTO,
  ): Promise<SubscriptionHistoryDTO>;
  findBySubscriptionId(subscriptionId: string): Promise<SubscriptionHistory[]>;
  findById(id: string): Promise<SubscriptionHistoryDTO | null>;
  delete(id: string): Promise<void>;
}
