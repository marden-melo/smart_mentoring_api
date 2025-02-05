import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { expertiseAreaSchema } from '../../validators/expertiseAreaValidator';
import { CreateExpertiseAreaUseCase } from '../../useCases/createExpertiseAreaUseCase';
import { GetAllExpertiseAreaUseCase } from '../../useCases/getAllExpertiseAreaUseCase';
import { GetExpertiseAreaByIdUseCase } from '../../useCases/getExpertiseAreaByIdUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { DeleteExpertiseAreaUseCase } from '../../useCases/deleteExpertiseAreaUseCase';
import { ExpertiseAreaDTO } from '../../dtos/expertiseAreaDTO';
import { UpdateExpertiseAreaUseCase } from '../../useCases/updateExpertiseAreaUseCase';

export async function createExpertiseAreaController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name } = expertiseAreaSchema.parse(request.body);

    const createExpertiseAreaUseCase = container.resolve(
      CreateExpertiseAreaUseCase,
    );

    const expertiseAreaData = await createExpertiseAreaUseCase.execute({
      name,
    });

    reply.status(201).send({
      message: 'Expertise Area created successfully',
      expertiseAreaData,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllExpertiseAreaController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllExpertiseAreasUseCase = container.resolve(
      GetAllExpertiseAreaUseCase,
    );
    const { data: expertiseAreas, total } =
      await getAllExpertiseAreasUseCase.execute();

    reply.status(200).send({
      total,
      data: expertiseAreas,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getExpertiseAreaByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getExpertiseAreaByIdUseCase = container.resolve(
      GetExpertiseAreaByIdUseCase,
    );
    const { data: expertiseArea } =
      await getExpertiseAreaByIdUseCase.execute(id);

    reply.status(200).send({ data: expertiseArea });
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

export async function deleteExpertiseAreaController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deleteExpertiseAreaUseCase = container.resolve(
      DeleteExpertiseAreaUseCase,
    );
    await deleteExpertiseAreaUseCase.execute(id);

    reply.status(200).send({ message: 'Expertise Area deleted successfully' });
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

export async function updateExpertiseAreaController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as ExpertiseAreaDTO;

    const updateExpertiseAreaUseCase = container.resolve(
      UpdateExpertiseAreaUseCase,
    );
    const updatedExpertiseArea = await updateExpertiseAreaUseCase.execute(
      id,
      data,
    );

    reply.status(200).send({
      message: 'Expertise Area updated successfully',
      data: updatedExpertiseArea,
    });
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
