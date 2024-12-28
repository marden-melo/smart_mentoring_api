import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from '../controller';

export async function categoryRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'Category',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['id', 'name'],
  });

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/category',
    {
      schema: {
        description: 'Create a new category',
        tags: ['Category'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['name'],
        },
        response: {
          201: {
            description: 'Category created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Category#' },
            },
          },
        },
      },
    },
    createCategoryController,
  );

  app.get(
    '/categories',
    {
      schema: {
        description: 'Retrieve all categories',
        tags: ['Category'],
        response: {
          200: {
            description: 'List of categories',
            type: 'object',
            properties: {
              total: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: 'Category#' },
              },
            },
          },
        },
      },
    },
    getAllCategoriesController,
  );

  app.get(
    '/category/:id',
    {
      schema: {
        description: 'Retrieve a category by ID',
        tags: ['Category'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Category details',
            type: 'object',
            properties: {
              data: { $ref: 'Category#' },
            },
          },
          404: {
            description: 'Category not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getCategoryByIdController,
  );

  app.put(
    '/category/:id',
    {
      schema: {
        description: 'Update a category',
        tags: ['Category'],
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
            description: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Category updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Category#' },
            },
          },
          404: {
            description: 'Category not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    updateCategoryController,
  );

  app.delete(
    '/category/:id',
    {
      schema: {
        description: 'Delete a category by ID',
        tags: ['Category'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Category deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Category not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteCategoryController,
  );
}
