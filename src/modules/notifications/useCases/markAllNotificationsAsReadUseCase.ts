import { injectable, inject } from 'tsyringe';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';

@injectable()
export class MarkAllNotificationsAsReadUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string): Promise<number> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }
    return this.notificationRepository.markAllAsRead(userId);
  }
}
