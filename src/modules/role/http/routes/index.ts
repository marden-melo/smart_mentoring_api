import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createRolesController,
  deleteRoleController,
  getAllRolesController,
  getRoleByIdController,
  updateRoleController,
} from '../controller';

export async function rolesRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'Role',
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
    required: ['id', 'name'],
  });

  //app.addHook('onRequest', verifyJwt);

  app.post(
    '/roles',
    {
      schema: {
        description: 'Create a new role',
        tags: ['Role'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },
        response: {
          201: {
            description: 'Role created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Role#' },
            },
          },
        },
      },
    },
    createRolesController,
  );

  app.get(
    '/roles',
    {
      schema: {
        description: 'Get all roles',
        tags: ['Role'],
        response: {
          200: {
            description: 'List of all roles',
            type: 'array',
            items: { $ref: 'Role#' },
          },
        },
      },
    },
    getAllRolesController,
  );

  app.get(
    '/roles/:id',
    {
      schema: {
        description: 'Get role by ID',
        tags: ['Role'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Role found by ID',
            type: 'object',
            properties: {
              data: { $ref: 'Role#' },
            },
          },
          409: {
            description: 'Role not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getRoleByIdController,
  );

  app.delete(
    '/roles/:id',
    {
      schema: {
        description: 'Delete a role',
        tags: ['Role'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Role deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteRoleController,
  );

  app.put(
    '/roles/:id',
    {
      schema: {
        description: 'Update a role',
        tags: ['Role'],
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
          required: ['name'],
        },
        response: {
          200: {
            description: 'Role updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'Role#' },
            },
          },
        },
      },
    },
    updateRoleController,
  );
}
