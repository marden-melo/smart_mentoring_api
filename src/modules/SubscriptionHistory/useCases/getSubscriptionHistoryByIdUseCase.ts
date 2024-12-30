import { injectable, inject } from 'tsyringe';
import { SubscriptionHistoryRepository } from '../repositories/prisma/subscriptionHistoryRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetSubscriptionHistoryByIdUseCase {
  constructor(
    @inject('SubscriptionHistoryRepository')
    private subscriptionHistoryRepository: SubscriptionHistoryRepository,
  ) {}

  async execute(id: string) {
    const subscriptionHistory =
      await this.subscriptionHistoryRepository.findById(id);

    if (!subscriptionHistory) {
      throw new ResourceNotFoundError('Subscription history not found.');
    }

    return {
      data: subscriptionHistory,
    };
  }
}
