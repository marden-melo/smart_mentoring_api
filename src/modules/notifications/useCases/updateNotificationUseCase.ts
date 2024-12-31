import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { INotificationRepository } from '../repositories/INotificationRepository';
import {
  NotificationResponseDTO,
  UpdateNotificationDTO,
} from '../dtos/notificationDTO';

@injectable()
export class UpdateNotificationUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateNotificationDTO,
  ): Promise<NotificationResponseDTO> {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new ResourceNotFoundError('Notification not found');
    }

    return this.notificationRepository.update(id, data);
  }
}
