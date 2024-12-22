import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createPlansController,
  deletePlanController,
  getAllPlansController,
  getPlanByIdController,
  updatePlanController,
} from '../controller';

export async function plansRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/plan',
    {
      schema: {
        description: 'Create a new plan',
        tags: ['Plans'],
        body: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: { type: 'string', description: 'Name of the plan' },
            description: {
              type: 'string',
              description: 'Name of the plan',
            },
            price: { type: 'number', description: 'Price of the plan' },
          },
        },
        response: {
          201: {
            description: 'Plan created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    createPlansController,
  );

  app.get(
    '/plans',
    {
      schema: {
        description: 'Retrieve all plans with pagination',
        tags: ['Plans'],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', default: 1 },
            limit: { type: 'integer', default: 10 },
          },
        },
        response: {
          200: {
            description: 'List of all Plans',
            type: 'object',
            properties: {
              total: { type: 'integer' },
              currentPage: { type: 'integer' },
              totalPages: { type: 'integer' },
              data: {
                type: 'array',
                plans: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    price: { type: 'number' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },
    getAllPlansController,
  );

  app.get(
    '/plan/:id',
    {
      schema: {
        description: 'Retrieve an plan by ID',
        tags: ['Plans'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Plan ID' },
          },
        },
        response: {
          200: {
            description: 'Plan data',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'Plan not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    getPlanByIdController,
  );

  app.put(
    '/plan/:id',
    {
      schema: {
        description: 'Update an plan by ID',
        tags: ['Plans'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Plan ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            price: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Plan updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  price: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'Plan not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    updatePlanController,
  );

  app.delete(
    '/plan/:id',
    {
      schema: {
        description: 'Delete an plan by ID',
        tags: ['Plans'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Plan ID' },
          },
        },
        response: {
          200: {
            description: 'Plan deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Plan not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    deletePlanController,
  );
}
