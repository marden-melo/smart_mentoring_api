import { injectable, inject } from 'tsyringe';
import { SubscriptionRepository } from '../repositories/prisma/subscriptionRepository';
import { CreateSubscriptionDTO } from '../dtos/subscriptionDTO';
import { BadRequestError } from '@/utils/errors/badRequestError';

@injectable()
export class CreateSubscriptionUseCase {
  constructor(
    @inject('SubscriptionRepository')
    private subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(data: CreateSubscriptionDTO) {
    if (!data.userId || !data.planId) {
      throw new BadRequestError('User ID and Plan ID are required.');
    }

    const subscription = await this.subscriptionRepository.create(data);

    return {
      data: subscription,
    };
  }
}
