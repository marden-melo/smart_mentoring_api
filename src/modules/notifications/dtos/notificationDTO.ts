export interface CreateNotificationDTO {
  userId: string;
  message: string;
}

export interface NotificationResponseDTO {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface UpdateNotificationDTO {
  isRead?: boolean;
}

export interface NotificationFilterDTO {
  userId?: string;
  isRead?: boolean;
  startDate?: Date;
  endDate?: Date;
}
