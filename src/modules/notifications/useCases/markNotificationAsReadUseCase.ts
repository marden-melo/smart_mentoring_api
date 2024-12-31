import { injectable, inject } from 'tsyringe';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { BadRequestError } from '@/utils/errors/badRequestError';

@injectable()
export class MarkNotificationAsReadUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute(id: string, isRead: boolean): Promise<boolean> {
    if (typeof isRead !== 'boolean') {
      throw new BadRequestError('isRead true or false required.');
    }

    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new ResourceNotFoundError();
    }

    return this.notificationRepository.markAsRead(id, isRead);
  }
}
