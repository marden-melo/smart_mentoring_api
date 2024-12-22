import { FastifyInstance } from 'fastify';
import { authenticateController } from '../controller';

export async function authRoute(app: FastifyInstance) {
  app.post('/sessions', authenticateController);
}
