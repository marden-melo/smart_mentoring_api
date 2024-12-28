import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from '../../useCases/createCategoryUseCase';
import { createCategorySchema } from '../../validators/createCategoryValidator';
import { GetAllCategoriessUseCase } from '../../useCases/getAllCategoriesUseCase';
import { GetCategoryByIdUseCase } from '../../useCases/getCategoryByIdUseCase';
import { DeleteCategoryUseCase } from '../../useCases/deleteCategoryUseCase';
import { UpdateCategoryUseCase } from '../../useCases/updateCategoryUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { UpdateCategoryDTO } from '../../dtos/categoryDTO';

export async function createCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name, description } = createCategorySchema.parse(request.body);

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const { data: category } = await createCategoryUseCase.execute({
      name,
      description,
    });

    reply
      .status(201)
      .send({ message: 'Category created successfully', data: category });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllCategoriesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllCategoriesUseCase = container.resolve(GetAllCategoriessUseCase);
    const { data: categories, total } = await getAllCategoriesUseCase.execute();

    reply.status(200).send({
      total,
      data: categories,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getCategoryByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getCategoryByIdUseCase = container.resolve(GetCategoryByIdUseCase);
    const { data: category } = await getCategoryByIdUseCase.execute(id);

    reply.status(200).send({ data: category });
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

export async function deleteCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);
    await deleteCategoryUseCase.execute(id);

    reply.status(200).send({ message: 'Categoru deleted successfully' });
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

export async function updateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as UpdateCategoryDTO;

    const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);
    const updatedCategory = await updateCategoryUseCase.execute(id, data);

    reply.status(200).send({
      message: 'Category updated successfully',
      data: updatedCategory,
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
