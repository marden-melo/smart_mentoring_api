import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { CreateRoleUseCase } from '../../useCases/createRoleUseCase';
import { createRolesSchema } from '../../validators/createRolesValidator';
import { GetAllRolesUseCase } from '../../useCases/getAllRolesUseCase';
import { GetRoleByIdUseCase } from '../../useCases/getRoleByIdUseCase';
import { DeleteRoleUseCase } from '../../useCases/deleteRoleUseCase';
import { Role } from '@prisma/client';
import { UpdateRoleUseCase } from '../../useCases/updateRoleUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

export async function createRolesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name } = createRolesSchema.parse(request.body);

    const createRolesUseCase = container.resolve(CreateRoleUseCase);

    const role = await createRolesUseCase.execute({
      name,
    });

    reply
      .status(201)
      .send({ message: 'Role created successfully', data: role });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllRolesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllRolesUseCase = container.resolve(GetAllRolesUseCase);
    const { data: roles } = await getAllRolesUseCase.execute();

    reply.status(200).send(roles);
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getRoleByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getRoleByIdUseCase = container.resolve(GetRoleByIdUseCase);
    const { data: role } = await getRoleByIdUseCase.execute(id);

    reply.status(200).send({ data: role });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function deleteRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase);
    await deleteRoleUseCase.execute(id);

    reply.status(200).send({ message: 'Role deleted successfully' });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function updateRoleController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as Partial<Role>;

    const updateRoleUseCase = container.resolve(UpdateRoleUseCase);
    const updatedRole = await updateRoleUseCase.execute(id, data);

    reply
      .status(200)
      .send({ message: 'Role updated successfully', data: updatedRole });
  } catch (e) {
    console.error('Error caught:', e);
    if (e instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: e.message });
    }
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}
