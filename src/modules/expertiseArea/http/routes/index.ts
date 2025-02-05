import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createExpertiseAreaController,
  deleteExpertiseAreaController,
  getAllExpertiseAreaController,
  getExpertiseAreaByIdController,
  updateExpertiseAreaController,
} from '../controller';

export async function expertiseAreaRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'ExpertiseArea',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  });

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/expertise-area',
    {
      schema: {
        description: 'Creates a new Expertise Area',
        tags: ['Expertise Area'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
        response: {
          201: {
            description: 'Expertise Area successfully created',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'ExpertiseArea#' },
            },
          },
        },
      },
    },
    createExpertiseAreaController,
  );

  app.get(
    '/expertise-area',
    {
      schema: {
        description: 'Lists all Expertise Areas',
        tags: ['Expertise Area'],
        response: {
          200: {
            description: 'List of Expertise Areas',
            type: 'object',
            properties: {
              total: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: 'ExpertiseArea#' },
              },
            },
          },
        },
      },
    },
    getAllExpertiseAreaController,
  );

  app.get(
    '/expertise-area/:id',
    {
      schema: {
        description: 'Retrieves an Expertise Area by ID',
        tags: ['Expertise Area'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Expertise Area details',
            type: 'object',
            properties: {
              data: { $ref: 'ExpertiseArea#' },
            },
          },
          404: {
            description: 'Expertise Area not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getExpertiseAreaByIdController,
  );

  app.put(
    '/expertise-area/:id',
    {
      schema: {
        description: 'Updates an Expertise Area',
        tags: ['Expertise Area'],
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
            name: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Expertise Area successfully updated',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'ExpertiseArea#' },
            },
          },
          404: {
            description: 'Expertise Area not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    updateExpertiseAreaController,
  );

  app.delete(
    '/expertise-area/:id',
    {
      schema: {
        description: 'Deletes an Expertise Area by ID',
        tags: ['Expertise Area'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Expertise Area successfully deleted',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Expertise Area not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteExpertiseAreaController,
  );
}
