import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/utils/middlewares/verify-jwt';
import {
  createMentorExpertiseController,
  getAllMentorExpertiseController,
  getMentorExpertiseByIdController,
  deleteMentorExpertiseController,
} from '../controller';

export async function mentorExpertiseRoutes(app: FastifyInstance) {
  app.addSchema({
    $id: 'MentorExpertise',
    type: 'object',
    properties: {
      id: { type: 'string' },
      mentorId: { type: 'string' },
      expertiseId: { type: 'string' },
    },
    required: ['id', 'mentorId', 'expertiseId'],
  });

  app.addHook('onRequest', verifyJwt);

  app.post(
    '/mentor-expertise',
    {
      schema: {
        description: 'Creates a new Mentor Expertise',
        tags: ['Mentor Expertise'],
        body: {
          type: 'object',
          properties: {
            mentorId: { type: 'string' },
            expertiseId: { type: 'string' },
          },
          required: ['mentorId', 'expertiseId'],
        },
        response: {
          201: {
            description: 'Mentor Expertise successfully created',
            type: 'object',
            properties: {
              message: { type: 'string' },
              data: { $ref: 'MentorExpertise#' },
            },
          },
        },
      },
    },
    createMentorExpertiseController,
  );

  app.get(
    '/mentor-expertise',
    {
      schema: {
        description: 'Lists all Mentor Expertise',
        tags: ['Mentor Expertise'],
        response: {
          200: {
            description: 'List of Mentor Expertise',
            type: 'object',
            properties: {
              total: { type: 'number' },
              data: {
                type: 'array',
                items: { $ref: 'MentorExpertise#' },
              },
            },
          },
        },
      },
    },
    getAllMentorExpertiseController,
  );

  app.get(
    '/mentor-expertise/:id',
    {
      schema: {
        description: 'Retrieves a Mentor Expertise by ID',
        tags: ['Mentor Expertise'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Mentor Expertise details',
            type: 'object',
            properties: {
              data: { $ref: 'MentorExpertise#' },
            },
          },
          404: {
            description: 'Mentor Expertise not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    getMentorExpertiseByIdController,
  );

  app.delete(
    '/mentor-expertise/:mentorId/:expertiseId',
    {
      schema: {
        description: 'Deletes a Mentor Expertise by Mentor ID and Expertise ID',
        tags: ['Mentor Expertise'],
        params: {
          type: 'object',
          properties: {
            mentorId: { type: 'string' },
            expertiseId: { type: 'string' },
          },
          required: ['mentorId', 'expertiseId'],
        },
        response: {
          200: {
            description: 'Mentor Expertise successfully deleted',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          404: {
            description: 'Mentor Expertise not found',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    deleteMentorExpertiseController,
  );
}
