import {
  CreateSubscriptionDTO,
  SubscriptionDTO,
  UpdateSubscriptionDTO,
} from '../dtos/subscriptionDTO';

export interface ISubscriptionRepository {
  create(data: CreateSubscriptionDTO): Promise<SubscriptionDTO>;
  findById(id: string): Promise<SubscriptionDTO | null>;
  findByUserId(userId: string): Promise<SubscriptionDTO[]>;
  update(id: string, data: UpdateSubscriptionDTO): Promise<SubscriptionDTO>;
  delete(id: string): Promise<void>;
  findActiveSubscriptions(): Promise<SubscriptionDTO[]>;
}
