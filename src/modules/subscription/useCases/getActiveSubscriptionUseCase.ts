import { injectable, inject } from 'tsyringe';
import { SubscriptionRepository } from '../repositories/prisma/subscriptionRepository';

@injectable()
export class GetActiveSubscriptionsUseCase {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute() {
    const activeSubscriptions =
      await this.subscriptionRepository.findActiveSubscriptions();

    return {
      data: activeSubscriptions,
    };
  }
}
