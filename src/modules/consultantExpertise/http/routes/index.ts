import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createConsultantExpertiseController,
  getAllConsultantExpertiseController,
  getConsultantExpertiseByIdController,
} from '../controller';

export async function consultantExpertiseRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'ConsultantExpertise',
    type: 'object',
    properties: {
      id: { type: 'string' },
      consultantId: { type: 'string' },
      expertiseId: { type: 'string' },
    },
    required: ['id', 'consultantId', 'expertiseId'],
  });

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/consultant-expertise',
    {
      schema: {
        description: 'Creates a new Consultant Expertise',
        tags: ['Consultant Expertise'],
        body: {
          type: 'object',
          properties: {
            consultant: { type: 'string' },
            expertiseId: { type: 'string' },
          },
          required: ['consultantId', 'expertiseId'],
        },
        response: {
          201: {
            description: 'Consultant Expertise successfully created',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'ConsultantExpertise#' },
            },
          },
        },
      },
    },
    createConsultantExpertiseController,
  );

  app.get(
    '/consultant-expertise',
    {
      schema: {
        description: 'Lists all Consultant Expertise',
        tags: ['Consultant Expertise'],
        response: {
          200: {
            description: 'List of Consultant Expertise',
            type: 'object',
            properties: {
              total: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: 'ConsultantExpertise#' },
              },
            },
          },
        },
      },
    },
    getAllConsultantExpertiseController,
  );

  app.get(
    '/consultant-expertise/:id',
    {
      schema: {
        description: 'Retrieves a Consultant Expertise by ID',
        tags: ['Consultant Expertise'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Consultant Expertise details',
            type: 'object',
            properties: {
              data: { $ref: 'ConsultantExpertise#' },
            },
          },
          404: {
            description: 'Consultant Expertise not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getConsultantExpertiseByIdController,
  );
}
