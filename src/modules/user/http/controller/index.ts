import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import registerUserBodySchema from '../../validators/registerUserValidator';
import { UserAlreadyExistsError } from '@/utils/errors/userAlreadyExistsError';
import { RegisterUsersUseCase } from '../../useCases/registerUsersUseCase';
import { convertToDate } from '@/utils/helpers/formatStringToDate';
import { GetAllUsersUseCase } from '../../useCases/getAllUsersUseCase';
import { GetByIdUsersUseCase } from '../../useCases/getByIdUsersUseCase';
import { DeleteUsersUseCase } from '../../useCases/deleteUserUseCase';
import { User } from '@prisma/client';
import { UpdateUserUseCase } from '../../useCases/updateUsersUseCase';
import { UserNotFoundError } from '@/utils/errors/userNotFoundError';
import { GetUserProfileUseCase } from '../../useCases/getUserProfileUseCase';

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, name, password, isActive, roleId } =
      registerUserBodySchema.parse(request.body);

    const registerUsersUseCase = container.resolve(RegisterUsersUseCase);

    const { data: user } = await registerUsersUseCase.execute({
      email,
      name,
      password,
      isActive,
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

    return reply
      .status(500)
      .send({
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
    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase);
    const { data: users, total } = await getAllUsersUseCase.execute();

    reply.status(200).send({
      total,
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
    const data = request.body as Partial<User>;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const updatedUser = await updateUserUseCase.execute(id, data);

    reply
      .status(200)
      .send({ message: 'User updated successfully', data: updatedUser });
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
