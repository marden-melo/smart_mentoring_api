import { injectable, inject } from 'tsyringe';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { NotificationFilterDTO } from '../dtos/notificationDTO';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetAllNotificationsByUserIdUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    userId: string,
    page: number = 1,
    limit: number = 10,
    filters?: NotificationFilterDTO,
  ) {
    const { data, total } =
      await this.notificationRepository.findPaginatedByUserId(
        userId,
        page,
        limit,
        filters,
      );

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (!data || data.length === 0) {
      throw new ResourceNotFoundError();
    }

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
