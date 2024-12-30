import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createSubscriptionHistoryController,
  getSubscriptionHistoryByIdController,
  updateSubscriptionHistoryController,
  deleteSubscriptionHistoryController,
  getActiveSubscriptionHistoriesController,
} from '../controller';

export async function subscriptionHistoryRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/subscription/history',
    {
      schema: {
        description: 'Create a new subscription history record',
        tags: ['SubscriptionHistory'],
        body: {
          type: 'object',
          properties: {
            subscriptionId: { type: 'string' },
            oldPlanId: { type: 'string' },
            newPlanId: { type: 'string' },
            changedAt: { type: 'string', format: 'date-time' },
          },
          required: ['subscriptionId', 'oldPlanId', 'newPlanId', 'changedAt'],
        },
        response: {
          201: {
            description: 'Subscription history created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  subscriptionId: { type: 'string' },
                  oldPlanId: { type: 'string' },
                  newPlanId: { type: 'string' },
                  changedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    createSubscriptionHistoryController,
  );

  app.get(
    '/subscription/history/:id',
    {
      schema: {
        description: 'Retrieve subscription history by ID',
        tags: ['SubscriptionHistory'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Subscription history details',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  subscriptionId: { type: 'string' },
                  oldPlanId: { type: 'string' },
                  newPlanId: { type: 'string' },
                  changedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    getSubscriptionHistoryByIdController,
  );

  app.put(
    '/subscription/history/:id',
    {
      schema: {
        description: 'Update subscription history details',
        tags: ['SubscriptionHistory'],
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
            oldPlanId: { type: 'string' },
            newPlanId: { type: 'string' },
            changedAt: { type: 'string', format: 'date-time' },
          },
        },
        response: {
          200: {
            description: 'Subscription history updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  subscriptionId: { type: 'string' },
                  oldPlanId: { type: 'string' },
                  newPlanId: { type: 'string' },
                  changedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    updateSubscriptionHistoryController,
  );

  app.delete(
    '/subscription/history/:id',
    {
      schema: {
        description: 'Delete a subscription history record by ID',
        tags: ['SubscriptionHistory'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Subscription history deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteSubscriptionHistoryController,
  );

  app.get(
    '/subscriptions/history/active',
    {
      schema: {
        description: 'Retrieve all active subscription histories',
        tags: ['SubscriptionHistory'],
        response: {
          200: {
            description: 'List of active subscription histories',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    subscriptionId: { type: 'string' },
                    oldPlanId: { type: 'string' },
                    newPlanId: { type: 'string' },
                    changedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getActiveSubscriptionHistoriesController,
  );
}
