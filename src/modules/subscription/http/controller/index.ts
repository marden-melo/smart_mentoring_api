import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { z } from 'zod';
import {
  createSubscriptionSchema,
  idSchema,
} from '../../validators/createSubscriptionValidator';
import { CreateSubscriptionUseCase } from '../../useCases/createSubscriptionUseCase';
import { GetSubscriptionByIdUseCase } from '../../useCases/getSubscriptionByIdUseCase';
import { DeleteSubscriptionUseCase } from '../../useCases/deleteSubscriptionUseCase';
import { GetActiveSubscriptionsUseCase } from '../../useCases/getActiveSubscriptionUseCase';
import { UpdateSubscriptionUseCase } from '../../useCases/updateSubscriptionUseCase';
import { UpdateSubscriptionDTO } from '../../dtos/subscriptionDTO';

export async function createSubscriptionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { userId, planId } = createSubscriptionSchema.parse(request.body);
    const createSubscriptionUseCase = container.resolve(
      CreateSubscriptionUseCase,
    );

    const { data: subscription } = await createSubscriptionUseCase.execute({
      userId,
      planId,
    });

    reply.status(201).send({
      message: 'Subscription created successfully',
      data: subscription,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getSubscriptionByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const getSubscriptionByIdUseCase = container.resolve(
      GetSubscriptionByIdUseCase,
    );

    const { data: subscription } = await getSubscriptionByIdUseCase.execute(id);

    reply.status(200).send({
      data: subscription,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateSubscriptionController(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const data = request.body as UpdateSubscriptionDTO;

    const updateSubscriptionUseCase = container.resolve(
      UpdateSubscriptionUseCase,
    );

    const { data: updatedSubscription } =
      await updateSubscriptionUseCase.execute(id, data);

    reply.status(200).send({
      message: 'Subscription updated successfully',
      data: updatedSubscription,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteSubscriptionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = idSchema.parse(request.params);
    const deleteSubscriptionUseCase = container.resolve(
      DeleteSubscriptionUseCase,
    );

    await deleteSubscriptionUseCase.execute(id);

    reply.status(200).send({
      message: 'Subscription deleted successfully',
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getActiveSubscriptionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getActiveSubscriptionsUseCase = container.resolve(
      GetActiveSubscriptionsUseCase,
    );

    const { data: activeSubscriptions } =
      await getActiveSubscriptionsUseCase.execute();

    reply.status(200).send({
      data: activeSubscriptions,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
