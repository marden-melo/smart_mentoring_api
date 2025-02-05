import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import registerUserBodySchema from '../../validators/registerUserValidator';
import { UserAlreadyExistsError } from '@/utils/errors/userAlreadyExistsError';
import { RegisterUsersUseCase } from '../../useCases/registerUsersUseCase';
import { GetAllUsersUseCase } from '../../useCases/getAllUsersUseCase';
import { GetByIdUsersUseCase } from '../../useCases/getByIdUsersUseCase';
import { DeleteUsersUseCase } from '../../useCases/deleteUserUseCase';
import { User } from '@prisma/client';
import { UpdateUserWithRoleUseCase } from '../../useCases/updateUserWithRoleUseCase';
import { UserNotFoundError } from '@/utils/errors/userNotFoundError';
import { GetUserProfileUseCase } from '../../useCases/getUserProfileUseCase';

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, name, password, roleId } = registerUserBodySchema.parse(
      request.body,
    );

    const registerUsersUseCase = container.resolve(RegisterUsersUseCase);

    const { data: user } = await registerUsersUseCase.execute({
      email,
      name,
      password,
      roleId,
    });

    reply
      .status(201)
      .send({ message: 'User registered successfully', data: user });
  } catch (e) {
    console.error('Error caught during user registration:', e);
    const error = e as Error;
    if (e instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: e.message });
    }

    if (error instanceof Error) {
      console.error('Error details:', error.stack);
    }

    return reply.status(500).send({
      error: 'Internal server error',
      details: error.message || 'Unknown error',
    });
  }
}

export async function getAllUsersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { page, limit } = request.query as { page?: number; limit?: number };
    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);
    const {
      data: users,
      total,
      currentPage,
      totalPages,
    } = await getAllUsersUseCase.execute(page || 1, limit || 10);

    reply.status(200).send({
      total,
      currentPage,
      totalPages,
      data: users,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getUserByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getByIdUsersUseCase = container.resolve(GetByIdUsersUseCase);
    const user = await getByIdUsersUseCase.execute(id);

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    reply.status(200).send({ data: user });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof UserNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    throw e;
  }
}

export async function updateUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const { data, roleType, additionalData } = request.body as {
      data: Partial<User>;
      roleType: 'MENTOR' | 'CONSULTANT';
      additionalData: any;
    };

    const updateUserWithRoleUseCase = container.resolve(
      UpdateUserWithRoleUseCase,
    );
    const result = await updateUserWithRoleUseCase.execute(
      id,
      data,
      roleType,
      additionalData,
    );

    reply
      .status(200)
      .send({ message: 'User updated successfully', data: result });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deleteUsersUseCase = container.resolve(DeleteUsersUseCase);
    await deleteUsersUseCase.execute(id);

    reply.status(200).send({ message: 'User deleted successfully' });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof UserNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function profileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as { sub: string };

  const getUserProfile = container.resolve(GetUserProfileUseCase);

  const { user: profile } = await getUserProfile.execute({
    userId: user.sub,
  });

  return reply.status(200).send({
    user: {
      ...profile,
      password_hash: undefined,
    },
  });
}
