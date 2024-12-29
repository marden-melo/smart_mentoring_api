import { FastifyInstance } from 'fastify';
import {
  createClientController,
  getAllClientsController,
  getClientByIdController,
  deleteClientController,
  updateClientController,
} from '../controller';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';

export async function clientsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.post('/client', {
    schema: {
      description: 'Create a new client',
      tags: ['Clients'],
      body: {
        type: 'object',
        properties: {
          clientType: { type: 'string', enum: ['COMPANY', 'INDIVIDUAL'] },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          cep: { type: 'string' },
          city: { type: 'string' },
          cnpj: { type: 'string', nullable: true },
          companyName: { type: 'string', nullable: true },
          cpf: { type: 'string', nullable: true },
          fullName: { type: 'string' },
          district: { type: 'string' },
          number: { type: 'string' },
          state: { type: 'string' },
          street: { type: 'string' },
          responsable: { type: 'string', nullable: true },
        },
        required: ['clientType', 'email', 'phone', 'fullName'],
      },
      response: {
        201: {
          description: 'Client successfully registered',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                fullName: { type: 'string' },
                clientType: { type: 'string' },
                cep: { type: 'string' },
                city: { type: 'string' },
                cnpj: { type: 'string', nullable: true },
                companyName: { type: 'string', nullable: true },
                cpf: { type: 'string', nullable: true },
                district: { type: 'string' },
                number: { type: 'string' },
                state: { type: 'string' },
                street: { type: 'string' },
                responsable: { type: 'string', nullable: true },
              },
            },
          },
        },
      },
    },
    handler: createClientController,
  });

  app.get('/clients', {
    schema: {
      description: 'Get all clients',
      tags: ['Clients'],
      response: {
        200: {
          description: 'List of clients',
          type: 'object',
          properties: {
            total: { type: 'number' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  fullName: { type: 'string' },
                  clientType: { type: 'string' },
                  cep: { type: 'string' },
                  city: { type: 'string' },
                  cnpj: { type: 'string', nullable: true },
                  companyName: { type: 'string', nullable: true },
                  cpf: { type: 'string', nullable: true },
                  district: { type: 'string' },
                  number: { type: 'string' },
                  state: { type: 'string' },
                  street: { type: 'string' },
                  responsable: { type: 'string', nullable: true },
                },
              },
            },
          },
        },
      },
    },
    handler: getAllClientsController,
  });

  app.get('/client/:id', {
    schema: {
      description: 'Get client by ID',
      tags: ['Clients'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      response: {
        200: {
          description: 'Client data by ID',
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                fullName: { type: 'string' },
                clientType: { type: 'string' },
                cep: { type: 'string' },
                city: { type: 'string' },
                cnpj: { type: 'string', nullable: true },
                companyName: { type: 'string', nullable: true },
                cpf: { type: 'string', nullable: true },
                district: { type: 'string' },
                number: { type: 'string' },
                state: { type: 'string' },
                street: { type: 'string' },
                responsable: { type: 'string', nullable: true },
              },
            },
          },
        },
      },
    },
    handler: getClientByIdController,
  });

  app.put('/client/:id', {
    schema: {
      description: 'Update a client by ID',
      tags: ['Clients'],
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
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          fullName: { type: 'string' },
          clientType: { type: 'string', enum: ['COMPANY', 'INDIVIDUAL'] },
          cep: { type: 'string' },
          city: { type: 'string' },
          cnpj: { type: 'string', nullable: true },
          companyName: { type: 'string', nullable: true },
          cpf: { type: 'string', nullable: true },
          district: { type: 'string' },
          number: { type: 'string' },
          state: { type: 'string' },
          street: { type: 'string' },
          responsable: { type: 'string', nullable: true },
        },
      },
      response: {
        200: {
          description: 'Client successfully updated',
          type: 'object',
          properties: {
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                phone: { type: 'string' },
                fullName: { type: 'string' },
                clientType: { type: 'string' },
                cep: { type: 'string' },
                city: { type: 'string' },
                cnpj: { type: 'string', nullable: true },
                companyName: { type: 'string', nullable: true },
                cpf: { type: 'string', nullable: true },
                district: { type: 'string' },
                number: { type: 'string' },
                state: { type: 'string' },
                street: { type: 'string' },
                responsable: { type: 'string', nullable: true },
              },
            },
          },
        },
      },
    },
    handler: updateClientController,
  });

  app.delete('/client/:id', {
    schema: {
      description: 'Delete a client by ID',
      tags: ['Clients'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      response: {
        200: {
          description: 'Client deleted successfully',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        404: {
          description: 'Client not found',
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: deleteClientController,
  });
}
