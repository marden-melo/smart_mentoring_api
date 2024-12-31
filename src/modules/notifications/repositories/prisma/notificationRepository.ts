import { INotificationRepository } from '../INotificationRepository';
import {
  CreateNotificationDTO,
  NotificationResponseDTO,
  NotificationFilterDTO,
  UpdateNotificationDTO,
} from '../../dtos/notificationDTO';
import { prisma } from '@/lib/prisma';

export class NotificationRepository implements INotificationRepository {
  async create(data: CreateNotificationDTO): Promise<NotificationResponseDTO> {
    const notification = await prisma.notification.create({
      data,
    });
    return this.toNotificationResponseDTO(notification);
  }

  async findAll(
    filters?: NotificationFilterDTO,
  ): Promise<NotificationResponseDTO[]> {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: filters?.userId,
        isRead: filters?.isRead,
        createdAt: {
          gte: filters?.startDate,
          lte: filters?.endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return notifications.map(this.toNotificationResponseDTO);
  }

  async findById(id: string): Promise<NotificationResponseDTO | null> {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });
    return notification ? this.toNotificationResponseDTO(notification) : null;
  }

  async findAllByUserId(
    userId: string,
    filters?: NotificationFilterDTO,
  ): Promise<NotificationResponseDTO[]> {
    const notifications = await prisma.notification.findMany({
      where: {
        userId,
        isRead: filters?.isRead,
        createdAt: {
          gte: filters?.startDate,
          lte: filters?.endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return notifications.map(this.toNotificationResponseDTO);
  }

  async update(
    id: string,
    data: UpdateNotificationDTO,
  ): Promise<NotificationResponseDTO> {
    const notification = await prisma.notification.update({
      where: { id },
      data,
    });
    return this.toNotificationResponseDTO(notification);
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return result.count;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.notification.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteAllByUserId(userId: string): Promise<number> {
    const result = await prisma.notification.deleteMany({
      where: { userId },
    });
    return result.count;
  }

  async countUnreadByUserId(userId: string): Promise<number> {
    const count = await prisma.notification.count({
      where: { userId, isRead: false },
    });
    return count;
  }

  async markAsRead(id: string, isRead: boolean): Promise<boolean> {
    try {
      await prisma.notification.update({
        where: { id },
        data: { isRead },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async findRecentByUserId(
    userId: string,
    limit: number,
  ): Promise<NotificationResponseDTO[]> {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return notifications.map(this.toNotificationResponseDTO);
  }

  async deleteAll(filters?: NotificationFilterDTO): Promise<number> {
    const result = await prisma.notification.deleteMany({
      where: {
        userId: filters?.userId,
        isRead: filters?.isRead,
        createdAt: {
          gte: filters?.startDate,
          lte: filters?.endDate,
        },
      },
    });
    return result.count;
  }

  async findPaginatedByUserId(
    userId: string,
    page: number,
    limit: number,
    filters?: NotificationFilterDTO,
  ): Promise<{ data: NotificationResponseDTO[]; total: number }> {
    const [data, total] = await Promise.all([
      prisma.notification.findMany({
        where: {
          userId,
          isRead: filters?.isRead,
          createdAt: {
            gte: filters?.startDate,
            lte: filters?.endDate,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.notification.count({
        where: {
          userId,
          isRead: filters?.isRead,
          createdAt: {
            gte: filters?.startDate,
            lte: filters?.endDate,
          },
        },
      }),
    ]);
    return { data: data || [], total };
  }

  async findAllByUserIds(
    userIds: string[],
    filters?: NotificationFilterDTO,
  ): Promise<NotificationResponseDTO[]> {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: { in: userIds },
        isRead: filters?.isRead,
        createdAt: {
          gte: filters?.startDate,
          lte: filters?.endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return notifications.map(this.toNotificationResponseDTO);
  }

  private toNotificationResponseDTO(
    notification: any,
  ): NotificationResponseDTO {
    return {
      id: notification.id,
      userId: notification.userId,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
    };
  }

  async findAllWithPagination(
    limit: number,
    offset: number,
    filter: NotificationFilterDTO,
  ): Promise<NotificationResponseDTO[]> {
    const notifications = await prisma.notification.findMany({
      skip: offset,
      take: limit,
      where: {
        ...filter,
      },
      orderBy: { createdAt: 'desc' },
    });
    return notifications.map(this.toNotificationResponseDTO);
  }

  async countNotifications(): Promise<number> {
    const total = await prisma.user.count();
    return total;
  }
}
