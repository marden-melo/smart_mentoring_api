import { injectable, inject } from 'tsyringe';
import { NotificationRepository } from '../repositories/prisma/notificationRepository';
import { CreateNotificationDTO } from '../dtos/notificationDTO';

@injectable()
export class CreateNotificationUseCase {
  constructor(
    @inject('NotificationRepository')
    private notificationRepository: NotificationRepository,
  ) {}

  async execute(data: CreateNotificationDTO) {
    const bonus = await this.notificationRepository.create(data);

    return {
      data: bonus,
    };
  }
}
