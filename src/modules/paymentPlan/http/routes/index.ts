import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createPaymentPlanController,
  getPaymentPlansByBudgetIdController,
  updatePaymentPlanController,
} from '../controller';

export async function paymentPlanRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/payment-plan',
    {
      schema: {
        description: 'Create a new payment plan',
        tags: ['PaymentPlan'],
        body: {
          type: 'object',
          properties: {
            budgetId: { type: 'string' },
            description: { type: 'string' },
            value: { type: 'number' },
            contractTerm: { type: 'number' },
            monthlyFee: { type: 'number' },
          },
          required: [
            'budgetId',
            'description',
            'value',
            'contractTerm',
            'monthlyFee',
          ],
        },
        response: {
          201: {
            description: 'Payment plan created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  budgetId: { type: 'string' },
                  description: { type: 'string' },
                  value: { type: 'number' },
                  contractTerm: { type: 'number' },
                  monthlyFee: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    createPaymentPlanController,
  );

  app.get(
    '/payment-plan/:budgetId',
    {
      schema: {
        description: 'Retrieve payment plans by budget ID',
        tags: ['PaymentPlan'],
        params: {
          type: 'object',
          properties: {
            budgetId: { type: 'string' },
          },
          required: ['budgetId'],
        },
        response: {
          200: {
            description: 'List of payment plans',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    budgetId: { type: 'string' },
                    description: { type: 'string' },
                    value: { type: 'number' },
                    contractTerm: { type: 'number' },
                    monthlyFee: { type: 'number' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getPaymentPlansByBudgetIdController,
  );

  app.put(
    '/payment-plan/:id',
    {
      schema: {
        description: 'Update a payment plan',
        tags: ['PaymentPlan'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            value: { type: 'number' },
            contractTerm: { type: 'number' },
            monthlyFee: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Payment plan updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  budgetId: { type: 'string' },
                  description: { type: 'string' },
                  value: { type: 'number' },
                  contractTerm: { type: 'number' },
                  monthlyFee: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    updatePaymentPlanController,
  );
}
