import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createBonusController,
  getAllBonusesController,
  getBonusByIdController,
  deleteBonusController,
  updateBonusController,
} from '../controller';

export async function bonusRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'Bonus',
    type: 'object',
    properties: {
      id: { type: 'string' },
      description: { type: 'string' },
      percentage: { type: 'number' },
      value: { type: 'number' },
    },
    required: ['id', 'description', 'percentage', 'value'],
  });

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/bonus',
    {
      schema: {
        description: 'Create a new bonus',
        tags: ['Bonus'],
        body: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            percentage: { type: 'number' },
            value: { type: 'number' },
          },
          required: ['description', 'percentage', 'value'],
        },
        response: {
          201: {
            description: 'Bonus created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Bonus#' },
            },
          },
        },
      },
    },
    createBonusController,
  );

  app.get(
    '/bonuses',
    {
      schema: {
        description: 'Retrieve all bonuses',
        tags: ['Bonus'],
        response: {
          200: {
            description: 'List of bonuses',
            type: 'object',
            properties: {
              total: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: 'Bonus#' },
              },
            },
          },
        },
      },
    },
    getAllBonusesController,
  );

  app.get(
    '/bonus/:id',
    {
      schema: {
        description: 'Retrieve a bonus by ID',
        tags: ['Bonus'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Bonus details',
            type: 'object',
            properties: {
              data: { $ref: 'Bonus#' },
            },
          },
          404: {
            description: 'Bonus not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getBonusByIdController,
  );

  app.put(
    '/bonus/:id',
    {
      schema: {
        description: 'Update a bonus',
        tags: ['Bonus'],
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
            percentage: { type: 'number' },
            value: { type: 'number' },
          },
        },
        response: {
          200: {
            description: 'Bonus updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Bonus#' },
            },
          },
          404: {
            description: 'Bonus not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    updateBonusController,
  );

  app.delete(
    '/bonus/:id',
    {
      schema: {
        description: 'Delete a bonus by ID',
        tags: ['Bonus'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Bonus deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Bonus not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteBonusController,
  );
}
