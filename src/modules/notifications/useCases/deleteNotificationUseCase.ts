import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { INotificationRepository } from '../repositories/INotificationRepository';

@injectable()
export class DeleteNotificationUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new ResourceNotFoundError();
    }

    await this.notificationRepository.delete(id);
  }
}
