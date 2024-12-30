import { injectable, inject } from 'tsyringe';
import { SubscriptionHistoryRepository } from '../repositories/prisma/subscriptionHistoryRepository';
import { CreateSubscriptionHistoryDTO } from '../dtos/subscriptionHistoryDTO';
import { BadRequestError } from '@/utils/errors/badRequestError';

@injectable()
export class CreateSubscriptionHistoryUseCase {
  constructor(
    @inject('SubscriptionHistoryRepository')
    private subscriptionHistoryRepository: SubscriptionHistoryRepository,
  ) {}

  async execute(data: CreateSubscriptionHistoryDTO) {
    if (!data.subscriptionId || !data.oldPlanId || !data.newPlanId) {
      throw new BadRequestError('IDs are required.');
    }

    const subscriptionHistory =
      await this.subscriptionHistoryRepository.create(data);

    return {
      data: subscriptionHistory,
    };
  }
}
