import { injectable, inject } from 'tsyringe';
import { SubscriptionRepository } from '../repositories/prisma/subscriptionRepository';
import { BadRequestError } from '@/utils/errors/badRequestError';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class DeleteSubscriptionUseCase {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(id: string) {
    if (!id) {
      throw new BadRequestError('Subscription ID is required.');
    }

    const existingSubscription = await this.subscriptionRepository.findById(id);

    if (!existingSubscription) {
      throw new ResourceNotFoundError('Subscription not found.');
    }

    await this.subscriptionRepository.delete(id);
  }
}
