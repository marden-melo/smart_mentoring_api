import fastify from 'fastify';
import { ZodError } from 'zod';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import fs from 'fs';
import path from 'path';
import { env } from './env';
import { plansRoutes } from './modules/plan/http/routes';
import { rolesRoutes } from './modules/role/http/routes';
import { permissionRoutes } from './modules/permissions/http/routes';
import { rolePermissionsRoutes } from './modules/rolePermissions/http/routes';
import { usersRoutes } from './modules/user/http/routes';
import fastifyJwt from 'fastify-jwt';
import { authRoute } from './modules/authentication/http/routes';
import { categoryRoutes } from './modules/categories/http/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

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
      { name: 'Plans', description: 'Plan related endpoints' },
      { name: 'Role', description: 'Role related endpoints' },
      { name: 'Permission', description: 'Permission related endpoints' },
      {
        name: 'Role Permissions',
        description: 'Role Permissions related endpoints',
      },
      { name: 'Category', description: 'Category related endpoints' },
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
app.register(plansRoutes);
app.register(rolesRoutes);
app.register(permissionRoutes);
app.register(rolePermissionsRoutes);
app.register(categoryRoutes);

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
