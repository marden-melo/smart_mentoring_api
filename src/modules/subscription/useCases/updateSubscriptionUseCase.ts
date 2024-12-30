import { injectable, inject } from 'tsyringe';
import { SubscriptionRepository } from '../repositories/prisma/subscriptionRepository';
import { UpdateSubscriptionDTO } from '../dtos/subscriptionDTO';
import { SubscriptionStatus } from '@prisma/client';
import { BadRequestError } from '@/utils/errors/badRequestError';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class UpdateSubscriptionUseCase {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(id: string, data: UpdateSubscriptionDTO) {
    if (!id) {
      throw new BadRequestError('Subscription ID is required.');
    }

    const existingSubscription = await this.subscriptionRepository.findById(id);

    if (!existingSubscription) {
      throw new ResourceNotFoundError('Subscription not found.');
    }

    if (
      data.status &&
      !Object.values(SubscriptionStatus).includes(data.status)
    ) {
      throw new BadRequestError('Invalid status.');
    }

    const updatedSubscription = await this.subscriptionRepository.update(
      id,
      data,
    );

    return {
      data: updatedSubscription,
    };
  }
}
