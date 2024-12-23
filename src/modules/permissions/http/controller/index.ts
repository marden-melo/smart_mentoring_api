import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { CreatePermissionUseCase } from '../../useCases/createPermissionUseCase';
import { createPermissionSchema } from '../../validators/createPermissionsValidator';
import { GetAllPermissionsUseCase } from '../../useCases/getAllPermissionsUseCase';
import { GetPermissionByIdUseCase } from '../../useCases/getPermissionByIdUseCase';
import { DeletePermissionUseCase } from '../../useCases/deletePermissionUseCase';
import { UpdatePermissionUseCase } from '../../useCases/updatePermissionUseCase';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { UpdatePermissionDTO } from '../../dtos/permissionDTO';

export async function createPermissionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { name, description } = createPermissionSchema.parse(request.body);

    const createPermissionsUseCase = container.resolve(CreatePermissionUseCase);

    const { data: permission } = await createPermissionsUseCase.execute({
      name,
      description,
    });

    reply
      .status(201)
      .send({ message: 'Permission created successfully', data: permission });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getAllPermissionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllPermissionsUseCase = container.resolve(
      GetAllPermissionsUseCase,
    );
    const { data: permissions } = await getAllPermissionsUseCase.execute();

    reply.status(200).send({
      data: permissions,
    });
  } catch (e) {
    console.error('Error caught:', e);
    const error = e as Error;
    return reply
      .status(500)
      .send({ error: 'Internal server error', details: error.message });
  }
}

export async function getPermissionByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const getPermissionByIdUseCase = container.resolve(
      GetPermissionByIdUseCase,
    );
    const { data: permission } = await getPermissionByIdUseCase.execute(id);

    reply.status(200).send({ data: permission });
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

export async function deletePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deletePermissionUseCase = container.resolve(DeletePermissionUseCase);
    await deletePermissionUseCase.execute(id);

    reply.status(200).send({ message: 'Permission deleted successfully' });
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

export async function updatePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const data = request.body as UpdatePermissionDTO;

    const updatePermissionUseCase = container.resolve(UpdatePermissionUseCase);
    const updatedPermission = await updatePermissionUseCase.execute(id, data);

    reply.status(200).send({
      message: 'Permission updated successfully',
      data: updatedPermission,
    });
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
