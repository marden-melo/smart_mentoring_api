import { FastifyInstance } from 'fastify';
import {
  registerUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  profileController,
  refresh,
} from '../controller';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import { verifyUserRole } from '@/utils/middlewares/verify-user-role';

export async function usersRoutes(app: FastifyInstance) {
  app.patch('/token/refresh', refresh);

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/users',
    {
      schema: {
        description: 'Create a new user',
        tags: ['Users'],
        body: {
          type: 'object',
          required: ['email', 'name', 'password', 'birthDate', 'phone'],
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
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'Birth date of the user',
            },
            phone: { type: 'string', description: 'Phone number of the user' },
            ssn: {
              type: 'string',
              description: 'Social Security Number of the user',
            },
            idCard: { type: 'string', description: 'ID card number' },
            idCardIssuer: {
              type: 'string',
              description: 'Issuer of the ID card',
            },
            profilePhoto: {
              type: 'string',
              description: 'URL of the profile photo',
            },
            isVerified: {
              type: 'boolean',
              description: 'Verification status of the user',
            },
            itemsRented: {
              type: 'integer',
              description: 'Total items rented by the user',
            },
            rating: { type: 'number', description: 'User rating' },
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
                  phone: { type: 'string' },
                  birthDate: { type: 'string', format: 'date' },
                  profilePhoto: { type: 'string' },
                  isVerified: { type: 'boolean' },
                  itemsRented: { type: 'integer' },
                  rating: { type: 'number' },
                  ssn: { type: 'string' },
                  idCard: { type: 'string' },
                  idCardIssuer: { type: 'string' },
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
      onRequest: [verifyUserRole('ADMIN')],
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
                    phone: { type: 'string' },
                    birthDate: { type: 'string', format: 'date' },
                    profilePhoto: { type: 'string' },
                    isVerified: { type: 'boolean' },
                    itemsRented: { type: 'integer' },
                    rating: { type: 'number' },
                    ssn: { type: 'string' },
                    idCard: { type: 'string' },
                    idCardIssuer: { type: 'string' },
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
                  phone: { type: 'string' },
                  birthDate: { type: 'string', format: 'date' },
                  profilePhoto: { type: 'string' },
                  isVerified: { type: 'boolean' },
                  itemsRented: { type: 'integer' },
                  rating: { type: 'number' },
                  ssn: { type: 'string' },
                  idCard: { type: 'string' },
                  idCardIssuer: { type: 'string' },
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
            phone: { type: 'string' },
            isVerified: { type: 'boolean' },
            rating: { type: 'number' },
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
                  phone: { type: 'string' },
                  birthDate: { type: 'string', format: 'date' },
                  profilePhoto: { type: 'string' },
                  isVerified: { type: 'boolean' },
                  itemsRented: { type: 'integer' },
                  rating: { type: 'number' },
                  ssn: { type: 'string' },
                  idCard: { type: 'string' },
                  idCardIssuer: { type: 'string' },
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

  app.get(
    '/me',
    {
      schema: {
        description: 'Retrieve the authenticated user profile',
        tags: ['Users'],
        response: {
          200: {
            description: 'User profile retrieved successfully',
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  birthDate: { type: 'string', format: 'date' },
                  profilePhoto: { type: 'string' },
                  isVerified: { type: 'boolean' },
                  itemsRented: { type: 'integer' },
                  rating: { type: 'number' },
                  ssn: { type: 'string' },
                  idCard: { type: 'string' },
                  idCardIssuer: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    profileController,
  );
}
