import { injectable, inject } from 'tsyringe';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { NotificationFilterDTO } from '../dtos/notificationDTO';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';

@injectable()
export class GetPaginatedNotificationsByUserIdUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    userId: string,
    page: number,
    limit: number,
    filters?: NotificationFilterDTO,
  ) {
    const notifications =
      await this.notificationRepository.findPaginatedByUserId(
        userId,
        page,
        limit,
        filters,
      );

    if (!notifications) {
      throw new ResourceNotFoundError('Nenhuma notificação encontrada.');
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return notifications;
  }
}
