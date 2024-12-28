import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/utils/errors/invalidCredentialsError';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new InvalidCredentialsError();
    }

    const rolePermissions = user.role.permissions.map(
      (rolePermission) => rolePermission.permission.name,
    );

    const token = await reply.jwtSign(
      { role: user.role.name, permissions: rolePermissions },
      { sign: { sub: user.id } },
    );

    return reply.status(200).send({
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
