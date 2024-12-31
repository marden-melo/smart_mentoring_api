import { injectable, inject } from 'tsyringe';
import { INotificationRepository } from '../repositories/INotificationRepository';
import {
  NotificationFilterDTO,
  NotificationResponseDTO,
} from '../dtos/notificationDTO';

@injectable()
export class GetAllNotificationsUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
  ) {}

  async execute(
    page: number = 1,
    limit: number = 10,
    filter: NotificationFilterDTO,
  ) {
    const offset = (page - 1) * limit;

    const notifications: NotificationResponseDTO[] =
      await this.notificationRepository.findAllWithPagination(
        limit,
        offset,
        filter,
      );

    const total = await this.notificationRepository.countNotifications();

    return {
      data: notifications,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
