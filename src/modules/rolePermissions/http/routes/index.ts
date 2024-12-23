import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createRolePermissionController,
  deleteRolePermissionController,
  getAllRolePermissionsController,
  getRolePermissionByIdController,
  updateRolePermissionController,
} from '../controller';

export async function rolePermissionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/role-permission',
    {
      schema: {
        description: 'Create a new Role Permission',
        tags: ['Role Permissions'],
        body: {
          type: 'object',
          required: ['roleId', 'permissionId'],
          properties: {
            roleId: { type: 'string', description: 'Role ID' },
            permissionId: { type: 'string', description: 'Permission ID' },
          },
        },
        response: {
          201: {
            description: 'Role Permission created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  roleId: { type: 'string' },
                  permissionId: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
      },
    },
    createRolePermissionController,
  );

  app.get(
    '/role-permissions',
    {
      schema: {
        description: 'Retrieve all role permissions with pagination',
        tags: ['Role Permissions'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: { type: 'integer', default: 1 },
          },
          {
            in: 'query',
            name: 'limit',
            schema: { type: 'integer', default: 10 },
          },
        ],
        response: {
          200: {
            description: 'List of all Role Permissions',
            type: 'object',
            properties: {
              total: { type: 'integer' },
              currentPage: { type: 'integer' },
              totalPages: { type: 'integer' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    roleId: { type: 'string' },
                    permissionId: { type: 'string' },
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
    getAllRolePermissionsController,
  );

  app.get(
    '/role-permission/:id',
    {
      schema: {
        description: 'Retrieve a role permission by ID',
        tags: ['Role Permissions'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Role Permission ID' },
          },
        },
        response: {
          200: {
            description: 'Role Permission data',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  roleId: { type: 'string' },
                  permissionId: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'Role Permission not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    getRolePermissionByIdController,
  );

  app.put(
    '/role-permission/:id',
    {
      schema: {
        description: 'Update a role permission by ID',
        tags: ['Role Permissions'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Role Permission ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            roleId: { type: 'string' },
            permissionId: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Role Permission updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  roleId: { type: 'string' },
                  permissionId: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'Role Permission not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    updateRolePermissionController,
  );

  app.delete(
    '/role-permission/:id',
    {
      schema: {
        description: 'Delete a role permission by ID',
        tags: ['Role Permissions'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Role Permission ID' },
          },
        },
        response: {
          200: {
            description: 'Role Permission deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Role Permission not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
    },
    deleteRolePermissionController,
  );
}
