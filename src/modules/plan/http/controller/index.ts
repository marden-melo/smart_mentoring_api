import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { CreatePlanUseCase } from '../../useCases/createPlanUseCase';
import { createPlansSchema } from '../../validators/createPlansValidator';
import { GetAllPlansUseCase } from '../../useCases/getAllPlansUseCase';
import { GetPlanByIdUseCase } from '../../useCases/getPlanByIdUseCase';
import { DeletePlanUseCase } from '../../useCases/deletePlanUseCase';
import { Plan } from '@prisma/client';
import { UpdatePlanUseCase } from '../../useCases/updatePlanUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

export async function createPlansController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name, price } = createPlansSchema.parse(request.body);

    const createPlansUseCase = container.resolve(CreatePlanUseCase);

    const { data: plan } = await createPlansUseCase.execute({
      name,
      price,
    });

    reply
      .status(201)
      .send({ message: 'Plan created successfully', data: plan });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllPlansController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { page = 1, limit = 10 } = request.query as {
      page?: number;
      limit?: number;
    };

    const getAllPlansUseCase = container.resolve(GetAllPlansUseCase);
    const {
      data: plans,
      total,
      currentPage,
      totalPages,
    } = await getAllPlansUseCase.execute(page, limit);

    reply.status(200).send({
      total,
      currentPage,
      totalPages,
      data: plans,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getPlanByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getPlanByIdUseCase = container.resolve(GetPlanByIdUseCase);
    const { data: plan } = await getPlanByIdUseCase.execute(id);

    reply.status(200).send({ data: plan });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deletePlanController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deletePlanUseCase = container.resolve(DeletePlanUseCase);
    await deletePlanUseCase.execute(id);

    reply.status(200).send({ message: 'Plan deleted successfully' });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updatePlanController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<Plan>;

    const updatePlanUseCase = container.resolve(UpdatePlanUseCase);
    const updatedPlan = await updatePlanUseCase.execute(id, data);

    reply
      .status(200)
      .send({ message: 'Plan updated successfully', data: updatedPlan });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
