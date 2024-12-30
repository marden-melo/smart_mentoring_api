import { injectable, inject } from 'tsyringe';
import { SubscriptionHistoryRepository } from '../repositories/prisma/subscriptionHistoryRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetBySubscriptionIdUseCase {
  constructor(
    @inject('SubscriptionHistoryRepository')
    private subscriptionHistoryRepository: SubscriptionHistoryRepository,
  ) {}

  async execute(subscriptionId: string) {
    const histories =
      await this.subscriptionHistoryRepository.findBySubscriptionId(
        subscriptionId,
      );

    if (!histories) {
      throw new ResourceNotFoundError(
        'No subscription history found for this subscription ID',
      );
    }

    return {
      data: histories,
    };
  }
}
