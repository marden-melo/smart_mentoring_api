import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { createBudgetSchema } from '../../validators/createBudgetValidator';
import { CreateBudgetUseCase } from '../../useCases/createBudgetUseCase';
import { AddBudgetHistoryUseCase } from '../../useCases/addBudgetHistoryUseCase';
import { AddItemsBudgetUseCase } from '../../useCases/addItemsBudgetUseCase';
import { DeleteBudgetUseCase } from '../../useCases/deleteBudgetUseCase';
import { GetBudgetByIdUseCase } from '../../useCases/getBudgetByIdUseCase';
import { GetBudgetHistoryUseCase } from '../../useCases/getBudgetHistoryUseCase';
import { GetBudgetsByClientIdUseCase } from '../../useCases/getBudgetsByClientIdUseCase';
import { GetBudgetsByUserIdUseCase } from '../../useCases/getBudgetsByUserIdUseCase';
import { GetItemsByBudgetIdUseCase } from '../../useCases/getItemsByBudgetIdUseCase';
import { RemoveItemFromBudgetUseCase } from '../../useCases/removeItemFromBudgetUseCase';
import { UpdateBudgetStatusUseCase } from '../../useCases/updateBudgetStatusUseCase';
import { UpdateBudgetUseCase } from '../../useCases/updateBudgetUseCase';
import {
  AddBudgetHistoryRequestBodyDTO,
  AddItemToBudgetRequestBodyDTO,
  GetBudgetsQueryDTO,
  GetBudgetsUserQueryDTO,
} from '../../dtos/budgetDTO';
import { BudgetStatus } from '@prisma/client';

export async function createBudgetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const {
      budgetNumber,
      clientId,
      items,
      paymentType,
      title,
      userId,
      additionalNotes,
      bonusId,
      description,
      discountPercent,
      discountValue,
      installments,
      status,
      subTotal,
      total,
    } = createBudgetSchema.parse(request.body);

    const createBudgetUseCase = container.resolve(CreateBudgetUseCase);

    const { data: budget } = await createBudgetUseCase.execute({
      budgetNumber,
      clientId,
      items,
      paymentType,
      title,
      userId,
      additionalNotes,
      bonusId,
      description,
      discountPercent,
      discountValue,
      installments,
      status,
      subTotal,
      total,
    });

    reply.status(201).send({
      message: 'Budget created successfully',
      data: budget,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function addBudgetHistoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { budgetId, description, userId, changeType } =
      request.body as AddBudgetHistoryRequestBodyDTO;
    const addBudgetHistoryUseCase = container.resolve(AddBudgetHistoryUseCase);

    await addBudgetHistoryUseCase.execute(
      budgetId,
      description,
      userId,
      changeType,
    );

    reply.status(200).send({
      message: 'Budget history added successfully',
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function addItemToBudgetController(
  request: FastifyRequest<{ Body: AddItemToBudgetRequestBodyDTO }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId, budgetItem } = request.body;
    const addItemsBudgetUseCase = container.resolve(AddItemsBudgetUseCase);

    const updatedBudget = await addItemsBudgetUseCase.execute(
      budgetId,
      budgetItem,
    );

    reply.status(200).send({
      message: 'Item added to budget successfully',
      data: updatedBudget,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteBudgetController(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const deleteBudgetUseCase = container.resolve(DeleteBudgetUseCase);

    await deleteBudgetUseCase.execute(id);

    reply.status(200).send({
      message: 'Budget deleted successfully',
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getBudgetByIdController(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const getBudgetByIdUseCase = container.resolve(GetBudgetByIdUseCase);

    const budget = await getBudgetByIdUseCase.execute(id);

    if (!budget) {
      return reply.status(404).send({ error: 'Budget not found' });
    }

    reply.status(200).send({
      data: budget,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getBudgetHistoryController(
  request: FastifyRequest<{
    Params: { budgetId: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId } = request.params;
    const getBudgetHistoryUseCase = container.resolve(GetBudgetHistoryUseCase);

    const history = await getBudgetHistoryUseCase.execute(budgetId);

    reply.status(200).send({
      data: history, // Send the history directly
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getBudgetsByClientIdController(
  request: FastifyRequest<{ Querystring: GetBudgetsQueryDTO }>,
  reply: FastifyReply,
) {
  try {
    const { clientId, page, limit } = request.query;
    const getBudgetsByClientIdUseCase = container.resolve(
      GetBudgetsByClientIdUseCase,
    );

    const { data, total, currentPage, totalPages } =
      await getBudgetsByClientIdUseCase.execute(clientId, page, limit);

    reply.status(200).send({
      data,
      total,
      currentPage,
      totalPages,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getBudgetsByUserIdController(
  request: FastifyRequest<{ Querystring: GetBudgetsUserQueryDTO }>,
  reply: FastifyReply,
) {
  try {
    const { userId, page, limit } = request.query;
    const getBudgetsByUserIdUseCase = container.resolve(
      GetBudgetsByUserIdUseCase,
    );

    const { data, total, currentPage, totalPages } =
      await getBudgetsByUserIdUseCase.execute(userId, page, limit);

    reply.status(200).send({
      data,
      total,
      currentPage,
      totalPages,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getItemsByBudgetIdController(
  request: FastifyRequest<{
    Params: { budgetId: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId } = request.params;
    const getItemsByBudgetIdUseCase = container.resolve(
      GetItemsByBudgetIdUseCase,
    );

    const items = await getItemsByBudgetIdUseCase.execute(budgetId);

    reply.status(200).send({
      data: items,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function removeItemFromBudgetController(
  request: FastifyRequest<{
    Params: { budgetId: string; itemId: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId, itemId } = request.params;
    const removeItemFromBudgetUseCase = container.resolve(
      RemoveItemFromBudgetUseCase,
    );

    const updatedBudget = await removeItemFromBudgetUseCase.execute(
      budgetId,
      itemId,
    );

    reply.status(200).send({
      message: 'Item removed from budget successfully',
      data: updatedBudget,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateBudgetStatusController(
  request: FastifyRequest<{
    Body: { budgetId: string; status: BudgetStatus };
  }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId, status } = request.body;
    const updateBudgetStatusUseCase = container.resolve(
      UpdateBudgetStatusUseCase,
    );

    const updatedBudget = await updateBudgetStatusUseCase.execute(
      budgetId,
      status,
    );

    reply.status(200).send({
      message: 'Budget status updated successfully',
      data: updatedBudget,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateBudgetController(
  request: FastifyRequest<{
    Body: { budgetId: string; data: any };
  }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId, data } = request.body;
    const updateBudgetUseCase = container.resolve(UpdateBudgetUseCase);

    const updatedBudget = await updateBudgetUseCase.execute(budgetId, data);

    reply.status(200).send({
      message: 'Budget updated successfully',
      data: updatedBudget,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
