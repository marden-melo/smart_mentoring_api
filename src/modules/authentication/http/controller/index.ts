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
      include: { role: true },
    });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new InvalidCredentialsError();
    }

    const token = await reply.jwtSign(
      { role: user.role.name },
      { sign: { sub: user.id } },
    );

    return reply.status(200).send({
      message: 'Authentication successful',
      token,
    });
  } catch (err: any) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message });
    }

    console.error('Unexpected error:', err);
    return reply.status(500).send({
      error: 'Internal Server Error',
      details: err.message || 'Unexpected error occurred',
    });
  }
}
