import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserPermission(permissionToVerify: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { permissions } = request.user;

    if (!permissions || !permissions.includes(permissionToVerify)) {
      return reply.status(403).send({ message: 'Forbidden' });
    }
  };
}
