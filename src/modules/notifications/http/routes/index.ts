import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createNotificationController,
  getAllNotificationsController,
  deleteNotificationController,
  markNotificationAsReadController,
  deleteAllNotificationsByUserIdController,
  updateNotificationController,
  markAllNotificationsAsReadController,
  getUnreadNotificationsCountController,
  findRecentNotificationsByUserIdController,
  getPaginatedNotificationsByUserIdController,
  getNotificationByUserIdController,
} from '../controller';

export async function notificationRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'Notification',
    type: 'object',
    properties: {
      id: { type: 'string' },
      userId: { type: 'string' },
      message: { type: 'string' },
      isRead: { type: 'boolean' },
      createdAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'userId', 'message', 'isRead', 'createdAt'],
  });

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/notification',
    {
      schema: {
        description: 'Create a new notification',
        tags: ['Notification'],
        body: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            message: { type: 'string' },
          },
          required: ['userId', 'message'],
        },
        response: {
          201: {
            description: 'Notification created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Notification#' },
            },
          },
        },
      },
    },
    createNotificationController,
  );

  app.get(
    '/notifications',
    {
      schema: {
        description: 'Retrieve all notifications',
        tags: ['Notification'],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'List of notifications',
            type: 'object',
            properties: {
              total: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: 'Notification#' },
              },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
        },
      },
    },
    getAllNotificationsController,
  );

  app.get(
    '/notification/:id',
    {
      schema: {
        description: 'Retrieve a notification by ID',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Notification details',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: 'Notification#' },
              },
              total: { type: 'number' },
              currentPage: { type: 'number' },
              totalPages: { type: 'number' },
            },
          },
          404: {
            description: 'Notification not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getNotificationByUserIdController,
  );

  app.delete(
    '/notification/:id',
    {
      schema: {
        description: 'Delete a notification',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          204: {
            description: 'Notification deleted successfully',
          },
        },
      },
    },
    deleteNotificationController,
  );

  app.put(
    '/notification/:id/read',
    {
      schema: {
        description: 'Mark a notification as read/unread',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            isRead: { type: 'boolean' },
          },
          required: ['isRead'],
        },
        response: {
          200: {
            description: 'Notification updated successfully',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
            },
          },
        },
      },
    },
    markNotificationAsReadController,
  );

  app.delete(
    '/notifications/user/:userId',
    {
      schema: {
        description: 'Delete all notifications by user ID',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
          required: ['userId'],
        },
        response: {
          200: {
            description: 'Notifications deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteAllNotificationsByUserIdController,
  );

  app.put(
    '/notification/:id',
    {
      schema: {
        description: 'Update a notification',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            isRead: { type: 'boolean' },
          },
          required: ['message', 'isRead'],
        },
        response: {
          200: {
            description: 'Notification updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Notification#' },
            },
          },
        },
      },
    },
    updateNotificationController,
  );

  app.put(
    '/notifications/user/:userId/mark-all-read',
    {
      schema: {
        description: 'Mark all notifications as read for a user',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
          required: ['userId'],
        },
        response: {
          200: {
            description: 'All notifications marked as read',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    markAllNotificationsAsReadController,
  );

  app.get(
    '/notifications/user/:userId/unread-count',
    {
      schema: {
        description: 'Get unread notifications count for a user',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
          required: ['userId'],
        },
        response: {
          200: {
            description: 'Unread notifications count',
            type: 'object',
            properties: {
              count: { type: 'number' },
            },
          },
        },
      },
    },
    getUnreadNotificationsCountController,
  );

  app.get(
    '/notifications/user/:userId/recent',
    {
      schema: {
        description: 'Get recent notifications for a user',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
          required: ['userId'],
        },
        querystring: {
          type: 'object',
          properties: {
            limit: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Recent notifications',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: 'Notification#' },
              },
            },
          },
        },
      },
    },
    findRecentNotificationsByUserIdController,
  );

  app.get(
    '/notifications/user/:userId/paginated',
    {
      schema: {
        description: 'Get paginated notifications for a user',
        tags: ['Notification'],
        params: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
          },
          required: ['userId'],
        },
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Paginated notifications',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: { $ref: 'Notification#' },
              },
            },
          },
        },
      },
    },
    getPaginatedNotificationsByUserIdController,
  );
}
