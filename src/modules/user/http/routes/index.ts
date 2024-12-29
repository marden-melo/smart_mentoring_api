import { FastifyInstance } from 'fastify';
import {
  registerUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '../controller';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import { verifyUserRole } from '@/utils/middlewares/verify-user-role';

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post(
    '/users',
    {
      schema: {
        description: 'Create a new user',
        tags: ['Users'],
        body: {
          type: 'object',
          required: ['email', 'name', 'password', 'roleId'],
          properties: {
            name: { type: 'string', description: 'Name of the user' },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email of the user',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Password for the user',
            },
            roleId: { type: 'string', description: 'Role ID of the user' },
            planId: {
              type: 'string',
              description: 'Optional plan ID of the user',
            },
            testStartDate: {
              type: 'string',
              format: 'date-time',
              description: 'Test start date',
            },
            isActive: {
              type: 'boolean',
              description: 'Status of user activity',
              default: true,
            },
          },
        },
        response: {
          201: {
            description: 'User created successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  roleId: { type: 'string' },
                  planId: { type: 'string' },
                  testStartDate: { type: 'string', format: 'date-time' },
                  isActive: { type: 'boolean' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          409: {
            description: 'User with this email already exists',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    registerUserController,
  );

  app.get(
    '/users',
    {
      schema: {
        description: 'Retrieve all users',
        tags: ['Users'],
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', default: 1 },
            limit: { type: 'integer', default: 10 },
          },
        },
        response: {
          200: {
            description: 'List of all users',
            type: 'object',
            properties: {
              total: { type: 'integer' },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    roleId: { type: 'string' },
                    planId: { type: 'string' },
                    testStartDate: { type: 'string', format: 'date-time' },
                    isActive: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
      onRequest: [verifyUserRole('ADMIN')],
    },
    getAllUsersController,
  );

  app.get(
    '/users/:id',
    {
      schema: {
        description: 'Retrieve a user by ID',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'User ID' },
          },
        },
        response: {
          200: {
            description: 'User data',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  roleId: { type: 'string' },
                  planId: { type: 'string' },
                  testStartDate: { type: 'string', format: 'date-time' },
                  isActive: { type: 'boolean' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'User not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
      onRequest: [verifyUserRole('ADMIN')],
    },
    getUserByIdController,
  );

  app.put(
    '/users/:id',
    {
      schema: {
        description: 'Update a user by ID',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'User ID' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            roleId: { type: 'string' },
            planId: { type: 'string' },
            testStartDate: { type: 'string', format: 'date-time' },
            isActive: { type: 'boolean' },
          },
        },
        response: {
          200: {
            description: 'User updated successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  roleId: { type: 'string' },
                  planId: { type: 'string' },
                  testStartDate: { type: 'string', format: 'date-time' },
                  isActive: { type: 'boolean' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          404: {
            description: 'User not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
      onRequest: [verifyUserRole('ADMIN')],
    },
    updateUserController,
  );

  app.delete(
    '/users/:id',
    {
      schema: {
        description: 'Delete a user by ID',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'User ID' },
          },
        },
        response: {
          200: {
            description: 'User deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'User not found',
            type: 'object',
            properties: {
              error: { type: 'string' },
            },
          },
        },
      },
      onRequest: [verifyUserRole('ADMIN')],
    },
    deleteUserController,
  );
}
