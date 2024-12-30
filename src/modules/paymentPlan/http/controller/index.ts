import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import {
  createPaymentPlanSchema,
  updatePaymentPlanSchema,
} from '../../validators/createPaymentPlanValidator';
import { CreatePaymentPlanUseCase } from '../../useCases/createPaymentPlanUseCase';
import { UpdatePaymentPlanUseCase } from '../../useCases/updatePaymentPlanUseCase';
import { GetPaymentPlanByBudgetIdUseCase } from '../../useCases/getPaymentPlanByBudgetId';

export async function createPaymentPlanController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { budgetId, description, value, contractTerm, monthlyFee } =
      createPaymentPlanSchema.parse(request.body);

    const createPaymentPlanUseCase = container.resolve(
      CreatePaymentPlanUseCase,
    );

    const paymentPlan = await createPaymentPlanUseCase.execute({
      description,
      budgetId,
      value,
      contractTerm,
      monthlyFee,
    });

    reply.status(201).send({
      message: 'Payment plan created successfully',
      data: paymentPlan,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getPaymentPlansByBudgetIdController(
  request: FastifyRequest<{ Params: { budgetId: string } }>,
  reply: FastifyReply,
) {
  try {
    const { budgetId } = request.params;

    const getPaymentPlanByBudgetIdUseCase = container.resolve(
      GetPaymentPlanByBudgetIdUseCase,
    );

    const paymentPlans =
      await getPaymentPlanByBudgetIdUseCase.execute(budgetId);

    reply.status(200).send({
      message: 'Payment plans retrieved successfully',
      data: paymentPlans,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updatePaymentPlanController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;

    const { description, value, contractTerm, monthlyFee } =
      updatePaymentPlanSchema.parse(request.body);

    const updateData = {
      id,
      description,
      value,
      contractTerm,
      monthlyFee,
    };

    const updatePaymentPlanUseCase = container.resolve(
      UpdatePaymentPlanUseCase,
    );

    const updatedPaymentPlan = await updatePaymentPlanUseCase.execute(
      id,
      updateData,
    );

    reply.status(200).send({
      message: 'Payment plan updated successfully',
      data: updatedPaymentPlan,
    });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
