import { injectable, inject } from 'tsyringe';
import { SubscriptionRepository } from '../repositories/prisma/subscriptionRepository';
import { BadRequestError } from '@/utils/errors/badRequestError';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetSubscriptionByIdUseCase {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(id: string) {
    if (!id) {
      throw new BadRequestError('Subscription ID is required.');
    }

    const subscription = await this.subscriptionRepository.findById(id);

    if (!subscription) {
      throw new ResourceNotFoundError('Subscription not found.');
    }

    return {
      data: subscription,
    };
  }
}
