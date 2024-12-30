import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createCustomFieldController,
  deleteCustomFieldController,
  getCustomFieldByIdController,
  getCustomFieldsByBudgetIdController,
  updateCustomFieldController,
} from '../controller';

export async function customFieldRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/custom-field',
    {
      schema: {
        description: 'Create a new custom field',
        tags: ['CustomFields'],
        body: {
          type: 'object',
          required: ['name', 'budgetId', 'value'],
          properties: {
            name: { type: 'string', description: 'Name of the custom field' },
            budgetId: { type: 'string', description: 'ID of the budget' },
            value: { type: 'string', description: 'Value of the custom field' },
          },
        },
        response: {
          201: {
            description: 'Custom field created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  budgetId: { type: 'string' },
                  value: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    createCustomFieldController,
  );

  app.get(
    '/custom-fields/budget/:budgetId',
    {
      schema: {
        description: 'Retrieve all custom fields by budget ID',
        tags: ['CustomFields'],
        params: {
          type: 'object',
          properties: {
            budgetId: { type: 'string', description: 'Budget ID' },
          },
        },
        response: {
          200: {
            description: 'List of custom fields',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    budgetId: { type: 'string' },
                    value: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          404: {
            description: 'No custom fields found for this budget ID',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    getCustomFieldsByBudgetIdController,
  );

  app.get(
    '/custom-field/:id',
    {
      schema: {
        description: 'Retrieve a custom field by ID',
        tags: ['CustomFields'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Custom field ID' },
          },
        },
        response: {
          200: {
            description: 'Custom field data',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  budgetId: { type: 'string' },
                  value: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'Custom field not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    getCustomFieldByIdController,
  );

  app.put(
    '/custom-field/:id',
    {
      schema: {
        description: 'Update a custom field by ID',
        tags: ['CustomFields'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Custom field ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            value: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Custom field updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  value: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'Custom field not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    updateCustomFieldController,
  );

  app.delete(
    '/custom-field/:id',
    {
      schema: {
        description: 'Delete a custom field by ID',
        tags: ['CustomFields'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Custom field ID' },
          },
        },
        response: {
          200: {
            description: 'Custom field deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Custom field not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    deleteCustomFieldController,
  );
}
