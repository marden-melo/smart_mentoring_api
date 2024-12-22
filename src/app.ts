import fastify from 'fastify';
import { ZodError } from 'zod';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fs from 'fs';
import path from 'path';
import { env } from './env';
import { usersRoutes } from './modules/user/http/routes';
import { plansRoutes } from './modules/plan/http/routes';

export const app = fastify();

app.register(swagger, {
  swagger: {
    info: {
      title: 'Quoth API',
      description: 'API Quoth.',
      version: '1.0.0',
    },
    host: 'localhost:3333',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Users', description: 'User related endpoints' },
      { name: 'Plan', description: 'Plan related endpoints' },
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

app.register(usersRoutes);
app.register(plansRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
