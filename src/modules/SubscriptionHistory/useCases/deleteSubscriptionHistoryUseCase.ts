import { injectable, inject } from 'tsyringe';
import { SubscriptionHistoryRepository } from '../repositories/prisma/subscriptionHistoryRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class DeleteSubscriptionHistoryUseCase {
  constructor(
    @inject('SubscriptionHistoryRepository')
    private subscriptionHistoryRepository: SubscriptionHistoryRepository,
  ) {}

  async execute(id: string) {
    const existingHistory =
      await this.subscriptionHistoryRepository.findById(id);

    if (!existingHistory) {
      throw new ResourceNotFoundError('Subscription history not found.');
    }

    await this.subscriptionHistoryRepository.delete(id);
  }
}
