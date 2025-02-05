import { FastifyInstance } from 'fastify';
import {
  registerUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  profileController,
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
                  roleName: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
          409: {
            description: 'User with this email already exists',
            type: 'object',
            properties: { message: { type: 'string' } },
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
        description:
          'Retrieve all users with full details (Role, Mentor, Consultant)',
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
            description: 'List of all users with full details',
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
                    name: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    avatar: { type: 'string' },
                    bio: { type: 'string' },
                    isActive: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
                    role: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                      },
                    },
                    mentor: {
                      type: 'object',
                      nullable: true,
                      properties: {
                        id: { type: 'string' },
                        area: { type: 'string' },
                        specialization: { type: 'string' },
                        availableSlots: {
                          type: 'array',
                          items: { type: 'string' },
                        },
                        experience: { type: 'string' },
                        successStories: { type: 'string' },
                        certifications: { type: 'string' },
                        projects: { type: 'string' },
                        methods: { type: 'string' },
                        strategy: { type: 'string' },
                        tools: { type: 'string' },
                        methodologies: { type: 'string' },
                      },
                    },
                    consultant: {
                      type: 'object',
                      nullable: true,
                      properties: {
                        id: { type: 'string' },
                        area: { type: 'string' },
                        specialization: { type: 'string' },
                        availableSlots: {
                          type: 'array',
                          items: { type: 'string' },
                        },
                        experience: { type: 'string' },
                        successStories: { type: 'string' },
                        certifications: { type: 'string' },
                        projects: { type: 'string' },
                        methods: { type: 'string' },
                        professionalSince: { type: 'string' },
                        strategy: { type: 'string' },
                        tools: { type: 'string' },
                        methodologies: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    getAllUsersController,
  );

  app.get(
    '/users/:id',
    {
      schema: {
        description:
          'Retrieve a user by ID with full details (Role, Mentor, Consultant)',
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
                  avatar: { type: 'string' },
                  bio: { type: 'string' },
                  isActive: { type: 'boolean' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  role: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                    },
                  },
                  mentor: {
                    type: 'object',
                    nullable: true,
                    properties: {
                      id: { type: 'string' },
                      area: { type: 'string' },
                      specialization: { type: 'string' },
                      availableSlots: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                      experience: { type: 'string' },
                      successStories: { type: 'string' },
                      certifications: { type: 'string' },
                      projects: { type: 'string' },
                      methods: { type: 'string' },
                      strategy: { type: 'string' },
                      tools: { type: 'string' },
                      methodologies: { type: 'string' },
                    },
                  },
                  consultant: {
                    type: 'object',
                    nullable: true,
                    properties: {
                      id: { type: 'string' },
                      area: { type: 'string' },
                      specialization: { type: 'string' },
                      availableSlots: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                      experience: { type: 'string' },
                      successStories: { type: 'string' },
                      certifications: { type: 'string' },
                      projects: { type: 'string' },
                      methods: { type: 'string' },
                      professionalSince: { type: 'string' },
                      strategy: { type: 'string' },
                      tools: { type: 'string' },
                      methodologies: { type: 'string' },
                    },
                  },
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
    },
    getUserByIdController,
  );

  app.put(
    '/users/:id/role',
    {
      schema: {
        description: 'Update the role of a user to MENTOR or CONSULTANT',
        tags: ['Users'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'User ID' },
          },
        },
        body: {
          type: 'object',
          required: ['roleType'],
          properties: {
            roleType: {
              type: 'string',
              enum: ['MENTOR', 'CONSULTANT'],
              description: 'Role to assign to the user',
            },
            additionalData: {
              type: 'object',
              description:
                'Additional data for the role (e.g., experience, area, etc.)',
            },
          },
        },
        response: {
          200: {
            description: 'User role updated successfully',
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
                  roleName: { type: 'string' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                  phone: { type: 'string' },
                  avatar: { type: 'string' },
                  bio: { type: 'string' },
                  mentor: {
                    type: 'object',
                    properties: {
                      area: { type: 'string' },
                      specialization: { type: 'string' },
                      availableSlots: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                      experience: { type: 'string' },
                      successStories: { type: 'string' },
                      certifications: { type: 'string' },
                      projects: { type: 'string' },
                      methods: { type: 'string' },
                      strategy: { type: 'string' },
                      tools: { type: 'string' },
                      methodologies: { type: 'string' },
                    },
                  },
                  consultant: {
                    type: 'object',
                    properties: {
                      area: { type: 'string' },
                      specialization: { type: 'string' },
                      availableSlots: {
                        type: 'array',
                        items: { type: 'string' },
                      },
                      experience: { type: 'string' },
                      successStories: { type: 'string' },
                      certifications: { type: 'string' },
                      projects: { type: 'string' },
                      methods: { type: 'string' },
                      professionalSince: { type: 'string' },
                      strategy: { type: 'string' },
                      tools: { type: 'string' },
                      methodologies: { type: 'string' },
                    },
                  },
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

  app.get('/me', profileController);
}
