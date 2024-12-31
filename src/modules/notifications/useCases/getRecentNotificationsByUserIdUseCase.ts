import { injectable, inject } from 'tsyringe';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class FindRecentNotificationsByUserIdUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string, limit: number) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return this.notificationRepository.findRecentByUserId(userId, limit);
  }
}
