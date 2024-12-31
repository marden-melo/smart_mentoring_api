import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { CreateNotificationUseCase } from '../../useCases/createNotificationUseCase';
import {
  createNotificationSchema,
  UpdateNotificationDTO,
} from '../../validators/createNotificationValidator';
import { NotificationFilterDTO } from '../../dtos/notificationDTO';
import { GetAllNotificationsUseCase } from '../../useCases/getAllNotificationsUseCase';
import { GetAllNotificationsByUserIdUseCase } from '../../useCases/getAllNotificationsByUserIdUseCase';
import { DeleteNotificationUseCase } from '../../useCases/deleteNotificationUseCase';
import { MarkNotificationAsReadUseCase } from '../../useCases/markNotificationAsReadUseCase';
import { DeleteAllNotificationsByUserIdUseCase } from '../../useCases/deleteAllNotificationsByUserIdUseCase';
import { UpdateNotificationUseCase } from '../../useCases/updateNotificationUseCase';
import { MarkAllNotificationsAsReadUseCase } from '../../useCases/markAllNotificationsAsReadUseCase';
import { GetUnreadNotificationsCountByUserIdUseCase } from '../../useCases/getUnreadNotificationsCountByUserIdUseCase';
import { FindRecentNotificationsByUserIdUseCase } from '../../useCases/getRecentNotificationsByUserIdUseCase';
import { GetPaginatedNotificationsByUserIdUseCase } from '../../useCases/getPaginatedNotificationsByUserIdUseCase';

export async function createNotificationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { userId, message } = createNotificationSchema.parse(request.body);

    const createNotificationUseCase = container.resolve(
      CreateNotificationUseCase,
    );

    const { data: notification } = await createNotificationUseCase.execute({
      userId,
      message,
    });

    reply.status(201).send({
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllNotificationsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { page = 1, limit = 10, ...filter } = request.query as any;

    const getAllNotificationsUseCase = container.resolve(
      GetAllNotificationsUseCase,
    );

    const {
      data: notifications,
      total,
      currentPage,
      totalPages,
    } = await getAllNotificationsUseCase.execute(page, limit, filter);

    reply.status(200).send({
      total,
      data: notifications,
      currentPage,
      totalPages,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getNotificationByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const getNotificationByIdUseCase = container.resolve(
      GetAllNotificationsByUserIdUseCase,
    );

    const { data, total, currentPage, totalPages } =
      await getNotificationByIdUseCase.execute(id);

    console.log('CONTROLLER - Fetched notifications:', {
      data,
      total,
      currentPage,
      totalPages,
      notificationCount: data.length,
    });

    return reply.status(200).send({
      data,
      total,
      currentPage,
      totalPages,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteNotificationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const deleteNotificationUseCase = container.resolve(
      DeleteNotificationUseCase,
    );

    await deleteNotificationUseCase.execute(id);
    reply.status(204).send();
  } catch (e) {
    console.error('Error caught:', e);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: (e as Error).message });
  }
}

export async function markNotificationAsReadController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const { isRead } = request.body as { isRead: boolean };
    const markNotificationAsReadUseCase = container.resolve(
      MarkNotificationAsReadUseCase,
    );

    const updated = await markNotificationAsReadUseCase.execute(id, isRead);

    reply.status(200).send({ success: updated });
  } catch (e) {
    console.error('Error caught:', e);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: (e as Error).message });
  }
}

export async function deleteAllNotificationsByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { userId } = request.params as { userId: string };
    const deleteAllNotificationsByUserIdUseCase = container.resolve(
      DeleteAllNotificationsByUserIdUseCase,
    );

    const deletedCount =
      await deleteAllNotificationsByUserIdUseCase.execute(userId);

    reply
      .status(200)
      .send({ message: `${deletedCount} notifications deleted successfully` });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateNotificationController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data: UpdateNotificationDTO = request.body as UpdateNotificationDTO;

    const updateNotificationUseCase = container.resolve(
      UpdateNotificationUseCase,
    );

    const updatedNotification = await updateNotificationUseCase.execute(
      id,
      data,
    );

    reply.status(200).send({
      message: 'Notification updated successfully',
      data: updatedNotification,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function markAllNotificationsAsReadController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { userId } = request.params as { userId: string };
    const markAllNotificationsAsReadUseCase = container.resolve(
      MarkAllNotificationsAsReadUseCase,
    );

    const markedCount = await markAllNotificationsAsReadUseCase.execute(userId);

    reply
      .status(200)
      .send({ message: `${markedCount} notifications marked as read` });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getUnreadNotificationsCountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { userId } = request.params as { userId: string };
    const getUnreadNotificationsCountByUserIdUseCase = container.resolve(
      GetUnreadNotificationsCountByUserIdUseCase,
    );

    const count =
      await getUnreadNotificationsCountByUserIdUseCase.execute(userId);

    reply.status(200).send({ count });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function findRecentNotificationsByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { userId } = request.params as { userId: string };
    const { limit } = request.query as { limit: number };

    const findRecentNotificationsByUserIdUseCase = container.resolve(
      FindRecentNotificationsByUserIdUseCase,
    );

    const notifications = await findRecentNotificationsByUserIdUseCase.execute(
      userId,
      limit,
    );

    reply.status(200).send({ data: notifications });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getPaginatedNotificationsByUserIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { userId } = request.params as { userId: string };
    const { page, limit } = request.query as { page: number; limit: number };
    const filters: NotificationFilterDTO = request.query as any;

    const getPaginatedNotificationsByUserIdUseCase = container.resolve(
      GetPaginatedNotificationsByUserIdUseCase,
    );

    const notifications =
      await getPaginatedNotificationsByUserIdUseCase.execute(
        userId,
        page,
        limit,
        filters,
      );

    reply.status(200).send({ data: notifications });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
