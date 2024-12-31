import { z } from 'zod';

export const createNotificationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  message: z.string().min(1, 'Message is required'),
});

export type CreateNotificationDTO = z.infer<typeof createNotificationSchema>;

export const updateNotificationSchema = z.object({
  isRead: z.boolean().optional(),
});

export type UpdateNotificationDTO = z.infer<typeof updateNotificationSchema>;
