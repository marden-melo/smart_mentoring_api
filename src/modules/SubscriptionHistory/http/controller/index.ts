import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import {
  createSubscriptionHistorySchema,
  idSchema,
} from '../../validators/createSubscriptionHistoryValidator';
import { CreateSubscriptionHistoryUseCase } from '../../useCases/createSubscriptionHistoryUseCase';

import { UpdateSubscriptionHistoryDTO } from '../../dtos/subscriptionHistoryDTO';
import { UpdateSubscriptionHistoryUseCase } from '../../useCases/updateSubscriptionHistoryUseCase ';
import { DeleteSubscriptionHistoryUseCase } from '../../useCases/deleteSubscriptionHistoryUseCase';
import { GetActiveSubscriptionsUseCase } from '@/modules/subscription/useCases/getActiveSubscriptionUseCase';
import { GetSubscriptionHistoryByIdUseCase } from '../../useCases/getSubscriptionHistoryByIdUseCase';

export async function createSubscriptionHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { changedAt, newPlanId, oldPlanId, subscriptionId } =
      createSubscriptionHistorySchema.parse(request.body);
    const createSubscriptionHistoryUseCase = container.resolve(
      CreateSubscriptionHistoryUseCase,
    );

    const { data: subscriptionHistory } =
      await createSubscriptionHistoryUseCase.execute({
        changedAt,
        newPlanId,
        oldPlanId,
        subscriptionId,
      });

    reply.status(201).send({
      message: 'Subscription history created successfully',
      data: subscriptionHistory,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getSubscriptionHistoryByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const getSubscriptionByIdUseCase = container.resolve(
      GetSubscriptionHistoryByIdUseCase,
    );

    const { data: subscriptionHistory } =
      await getSubscriptionByIdUseCase.execute(id);

    reply.status(200).send({
      data: subscriptionHistory,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateSubscriptionHistoryController(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const data = request.body as UpdateSubscriptionHistoryDTO;

    const updateSubscriptionHistoryUseCase = container.resolve(
      UpdateSubscriptionHistoryUseCase,
    );

    const { data: updatedSubscriptionHistory } =
      await updateSubscriptionHistoryUseCase.execute(id, data);

    reply.status(200).send({
      message: 'Subscription history updated successfully',
      data: updatedSubscriptionHistory,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteSubscriptionHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const deleteSubscriptionHistoryUseCase = container.resolve(
      DeleteSubscriptionHistoryUseCase,
    );

    await deleteSubscriptionHistoryUseCase.execute(id);

    reply.status(200).send({
      message: 'Subscription history deleted successfully',
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getActiveSubscriptionHistoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getActiveSubscriptionsUseCase = container.resolve(
      GetActiveSubscriptionsUseCase,
    );

    const { data: activeSubscriptionHistories } =
      await getActiveSubscriptionsUseCase.execute();

    reply.status(200).send({
      data: activeSubscriptionHistories,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
