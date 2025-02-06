import fastify from 'fastify';
import { ZodError } from 'zod';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fs from 'fs';
import path from 'path';
import { env } from './env';
import { rolesRoutes } from './modules/role/http/routes';
import { usersRoutes } from './modules/user/http/routes';
import fastifyJwt from 'fastify-jwt';
import { authRoute } from './modules/authentication/http/routes';
import fastifyCors from '@fastify/cors';
import { expertiseAreaRoutes } from './modules/expertiseArea/http/routes';
import { mentorExpertiseRoutes } from './modules/mentorExpertise/http/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

app.register(swagger, {
  swagger: {
    info: {
      title: 'SmartMentoring API',
      description: 'API SmartMentoring.',
      version: '1.0.0',
    },
    host: 'localhost:3333',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Users', description: 'User related endpoints' },
      { name: 'Role', description: 'Role related endpoints' },
      {
        name: 'Expertise Area',
        description: 'Expertise Area related endpoints',
      },
      {
        name: 'Mentor Expertise',
        description: 'Mentor Expertise related endpoints',
      },
    ],
  },
});

app.register(swaggerUI, {
  routePrefix: '/docs',
});

app.ready((err) => {
  if (err) throw err;
  const swaggerFilePath = path.join(__dirname, '../swagger.json');
  fs.writeFileSync(swaggerFilePath, JSON.stringify(app.swagger(), null, 2));
  console.log(`Swagger documentation generated at ${swaggerFilePath}`);
});

app.register(authRoute);
app.register(usersRoutes);
app.register(rolesRoutes);
app.register(expertiseAreaRoutes);
app.register(mentorExpertiseRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    console.error('Validation error:', error.format());
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    });
  }

  console.error('Internal Server Error:', error.stack || error.message);

  if (env.NODE_ENV !== 'production') {
    console.error('Detailed Error:', error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
