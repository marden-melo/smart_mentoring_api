import {
  CreateNotificationDTO,
  NotificationFilterDTO,
  NotificationResponseDTO,
  UpdateNotificationDTO,
} from '../dtos/notificationDTO';

export interface INotificationRepository {
  create(data: CreateNotificationDTO): Promise<NotificationResponseDTO>;
  findAll(filters?: NotificationFilterDTO): Promise<NotificationResponseDTO[]>;
  findById(id: string): Promise<NotificationResponseDTO | null>;
  findAllByUserId(
    userId: string,
    filters?: NotificationFilterDTO,
  ): Promise<NotificationResponseDTO[]>;
  update(
    id: string,
    data: UpdateNotificationDTO,
  ): Promise<NotificationResponseDTO>;
  markAllAsRead(userId: string): Promise<number>;
  delete(id: string): Promise<boolean>;
  deleteAllByUserId(userId: string): Promise<number>;
  countUnreadByUserId(userId: string): Promise<number>;
  markAsRead(id: string, isRead: boolean): Promise<boolean>;
  findRecentByUserId(
    userId: string,
    limit: number,
  ): Promise<NotificationResponseDTO[]>;
  deleteAll(filters?: NotificationFilterDTO): Promise<number>;
  findPaginatedByUserId(
    userId: string,
    page: number,
    limit: number,
    filters?: NotificationFilterDTO,
  ): Promise<{ data: NotificationResponseDTO[]; total: number }>;
  findAllByUserIds(
    userIds: string[],
    filters?: NotificationFilterDTO,
  ): Promise<NotificationResponseDTO[]>;
  findAllWithPagination(
    limit: number,
    offset: number,
    filter: NotificationFilterDTO,
  ): Promise<NotificationResponseDTO[]>;
  countNotifications(): Promise<number>;
}
