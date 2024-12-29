import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { createBonusSchema } from '../../validators/createBonusValidator';
import { CreateBonusUseCase } from '../../useCases/createBonusUseCase';
import { GetAllBonusesUseCase } from '../../useCases/getAllBonusUseCase';
import { GetBonusByIdUseCase } from '../../useCases/getBonusByIdUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { DeleteBonusUseCase } from '../../useCases/deleteBonusUseCase';
import { UpdateBonusDTO } from '../../dtos/bonusDTO';
import { UpdateBonusUseCase } from '../../useCases/updateCategoryUseCase';

export async function createBonusController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { percentage, description, value } = createBonusSchema.parse(
      request.body,
    );

    const createBonusUseCase = container.resolve(CreateBonusUseCase);

    const { data: bonus } = await createBonusUseCase.execute({
      description,
      percentage,
      value,
    });

    reply
      .status(201)
      .send({ message: 'Bonus created successfully', data: bonus });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllBonusesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllBonusesUseCase = container.resolve(GetAllBonusesUseCase);
    const { data: bonuses, total } = await getAllBonusesUseCase.execute();

    reply.status(200).send({
      total,
      data: bonuses,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getBonusByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getBonusByIdUseCase = container.resolve(GetBonusByIdUseCase);
    const { data: bonus } = await getBonusByIdUseCase.execute(id);

    reply.status(200).send({ data: bonus });
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

export async function deleteBonusController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deleteBonusUseCase = container.resolve(DeleteBonusUseCase);
    await deleteBonusUseCase.execute(id);

    reply.status(200).send({ message: 'Bonus deleted successfully' });
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

export async function updateBonusController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as UpdateBonusDTO;

    const updateBonusUseCase = container.resolve(UpdateBonusUseCase);
    const updatedBonus = await updateBonusUseCase.execute(id, data);

    reply.status(200).send({
      message: 'Bonus updated successfully',
      data: updatedBonus,
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
