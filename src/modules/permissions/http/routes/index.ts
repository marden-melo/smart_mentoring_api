import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createPermissionsController,
  deletePermissionController,
  getAllPermissionsController,
  getPermissionByIdController,
  updatePermissionController,
} from '../controller';

export async function permissionRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'Permission',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['id', 'name', 'description'],
  });

  // app.addHook('onRequest', verifyJwt);

  app.post(
    '/permissions',
    {
      schema: {
        description: 'Create a new permission',
        tags: ['Permission'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['name', 'description'],
        },
        response: {
          201: {
            description: 'Permission created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Permission#' },
            },
          },
        },
      },
    },
    createPermissionsController,
  );

  app.get(
    '/permissions',
    {
      schema: {
        description: 'Get all permissions',
        tags: ['Permission'],
        response: {
          200: {
            description: 'List of all permissions',
            type: 'array',
            items: { $ref: 'Permission#' },
          },
        },
      },
    },
    getAllPermissionsController,
  );

  app.get(
    '/permissions/:id',
    {
      schema: {
        description: 'Get permission by ID',
        tags: ['Permission'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Permission found by ID',
            type: 'object',
            properties: {
              data: { $ref: 'Permission#' },
            },
          },
          409: {
            description: 'Permission not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getPermissionByIdController,
  );

  app.delete(
    '/permissions/:id',
    {
      schema: {
        description: 'Delete a permission',
        tags: ['Permission'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Permission deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deletePermissionController,
  );

  app.put(
    '/permissions/:id',
    {
      schema: {
        description: 'Update a permission',
        tags: ['Permission'],
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
          required: ['name', 'description'],
        },
        response: {
          200: {
            description: 'Permission updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Permission#' },
            },
          },
        },
      },
    },
    updatePermissionController,
  );
}
