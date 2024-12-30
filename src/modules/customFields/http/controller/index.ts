import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { CreateCustomFieldUseCase } from '../../useCases/createCustomFieldUseCase';
import {
  createCustomFieldSchema,
  updateCustomFieldSchema,
} from '../../validators/createPlansValidator';
import { UpdateCustomFieldUseCase } from '../../useCases/updateCustomFieldUseCase';
import { GetCustomFieldByIdUseCase } from '../../useCases/getCustomFieldByIdUseCase';
import { DeleteCustomFieldUseCase } from '../../useCases/deleteCustomFieldUseCase';
import { GetCustomFieldsByBudgetIdUseCase } from '../../useCases/getCustomFieldsByBudgetIdUseCase';

export async function createCustomFieldController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name, budgetId, value } = createCustomFieldSchema.parse(
      request.body,
    );

    const createCustomFieldUseCase = container.resolve(
      CreateCustomFieldUseCase,
    );

    const customField = await createCustomFieldUseCase.execute({
      name,
      budgetId,
      value,
    });

    reply.status(201).send({
      message: 'Custom field created successfully',
      data: customField,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateCustomFieldController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const { name, value } = updateCustomFieldSchema.parse(request.body);

    const updateCustomFieldUseCase = container.resolve(
      UpdateCustomFieldUseCase,
    );

    const updatedCustomField = await updateCustomFieldUseCase.execute(id, {
      name,
      value,
    });

    if (!updatedCustomField) {
      return reply.status(404).send({
        message: 'Custom field not found',
      });
    }

    reply.status(200).send({
      message: 'Custom field updated successfully',
      data: updatedCustomField,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getCustomFieldByIdController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const getCustomFieldByIdUseCase = container.resolve(
      GetCustomFieldByIdUseCase,
    );

    const customField = await getCustomFieldByIdUseCase.execute(id);

    if (!customField) {
      return reply.status(404).send({
        message: 'Custom field not found',
      });
    }

    reply.status(200).send({
      message: 'Custom field retrieved successfully',
      data: customField,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteCustomFieldController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const deleteCustomFieldUseCase = container.resolve(
      DeleteCustomFieldUseCase,
    );

    await deleteCustomFieldUseCase.execute(id);

    reply.status(200).send({
      message: 'Custom field deleted successfully',
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getCustomFieldsByBudgetIdController(
  request: FastifyRequest<{ Params: { budgetId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId } = request.params;

    const getCustomFieldsByBudgetIdUseCase = container.resolve(
      GetCustomFieldsByBudgetIdUseCase,
    );

    const customFields =
      await getCustomFieldsByBudgetIdUseCase.execute(budgetId);

    reply.status(200).send({
      message: 'Custom fields retrieved successfully',
      data: customFields,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
