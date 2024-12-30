import { injectable, inject } from 'tsyringe';
import { SubscriptionHistoryRepository } from '../repositories/prisma/subscriptionHistoryRepository';
import { UpdateSubscriptionHistoryDTO } from '../dtos/subscriptionHistoryDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class UpdateSubscriptionHistoryUseCase {
  constructor(
    @inject('SubscriptionHistoryRepository')
    private subscriptionHistoryRepository: SubscriptionHistoryRepository,
  ) {}

  async execute(id: string, data: UpdateSubscriptionHistoryDTO) {
    const existingHistory =
      await this.subscriptionHistoryRepository.findById(id);

    if (!existingHistory) {
      throw new ResourceNotFoundError('Subscription history not found.');
    }

    const updatedHistory = await this.subscriptionHistoryRepository.update(id, {
      ...data,
      changedAt: new Date(data.changedAt),
    });

    return {
      data: updatedHistory,
    };
  }
}
