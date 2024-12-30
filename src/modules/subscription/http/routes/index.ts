import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createSubscriptionController,
  getSubscriptionByIdController,
  updateSubscriptionController,
  deleteSubscriptionController,
  getActiveSubscriptionsController,
} from '../controller';

export async function subscriptionRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/subscription',
    {
      schema: {
        description: 'Create a new subscription for a user',
        tags: ['Subscription'],
        body: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            planId: { type: 'string' },
          },
          required: ['userId', 'planId'],
        },
        response: {
          201: {
            description: 'Subscription created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  userId: { type: 'string' },
                  planId: { type: 'string' },
                  status: { type: 'string' },
                  startDate: { type: 'string' },
                  endDate: { type: 'string' },
                  isActive: { type: 'boolean' },
                  autoRenew: { type: 'boolean' },
                  renewalDate: { type: 'string' },
                  cancellationDate: { type: 'string' },
                  trialEndDate: { type: 'string' },
                  lastPaymentDate: { type: 'string' },
                  nextPaymentDate: { type: 'string' },
                  paymentInterval: { type: 'string' },
                  paymentGateway: { type: 'string' },
                  externalReference: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    createSubscriptionController,
  );

  app.get(
    '/subscription/:id',
    {
      schema: {
        description: 'Retrieve subscription by ID',
        tags: ['Subscription'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Subscription details',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  userId: { type: 'string' },
                  planId: { type: 'string' },
                  status: { type: 'string' },
                  startDate: { type: 'string' },
                  endDate: { type: 'string' },
                  isActive: { type: 'boolean' },
                  autoRenew: { type: 'boolean' },
                  renewalDate: { type: 'string' },
                  cancellationDate: { type: 'string' },
                  trialEndDate: { type: 'string' },
                  lastPaymentDate: { type: 'string' },
                  nextPaymentDate: { type: 'string' },
                  paymentInterval: { type: 'string' },
                  paymentGateway: { type: 'string' },
                  externalReference: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    getSubscriptionByIdController,
  );

  app.put(
    '/subscription/:id',
    {
      schema: {
        description: 'Update subscription details',
        tags: ['Subscription'],
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
            userId: { type: 'string' },
            planId: { type: 'string' },
            status: { type: 'string' },
            startDate: { type: 'string' },
            endDate: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Subscription updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  userId: { type: 'string' },
                  planId: { type: 'string' },
                  status: { type: 'string' },
                  startDate: { type: 'string' },
                  endDate: { type: 'string' },
                  isActive: { type: 'boolean' },
                  autoRenew: { type: 'boolean' },
                  renewalDate: { type: 'string' },
                  cancellationDate: { type: 'string' },
                  trialEndDate: { type: 'string' },
                  lastPaymentDate: { type: 'string' },
                  nextPaymentDate: { type: 'string' },
                  paymentInterval: { type: 'string' },
                  paymentGateway: { type: 'string' },
                  externalReference: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    updateSubscriptionController,
  );

  app.delete(
    '/subscription/:id',
    {
      schema: {
        description: 'Delete a subscription by ID',
        tags: ['Subscription'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Subscription deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteSubscriptionController,
  );

  app.get(
    '/subscriptions/active',
    {
      schema: {
        description: 'Retrieve all active subscriptions',
        tags: ['Subscription'],
        response: {
          200: {
            description: 'List of active subscriptions',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    userId: { type: 'string' },
                    planId: { type: 'string' },
                    status: { type: 'string' },
                    startDate: { type: 'string' },
                    endDate: { type: 'string' },
                    isActive: { type: 'boolean' },
                    autoRenew: { type: 'boolean' },
                    renewalDate: { type: 'string' },
                    cancellationDate: { type: 'string' },
                    trialEndDate: { type: 'string' },
                    lastPaymentDate: { type: 'string' },
                    nextPaymentDate: { type: 'string' },
                    paymentInterval: { type: 'string' },
                    paymentGateway: { type: 'string' },
                    externalReference: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getActiveSubscriptionsController,
  );
}
