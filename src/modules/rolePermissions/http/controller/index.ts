import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { CreateRolePermissionUseCase } from '../../useCases/createRolePermissionUseCase';
import { createRolePermissionSchema } from '../../validators/createRolePermissionValidator';
import { GetAllRolePermissionsUseCase } from '../../useCases/getAllRolePermissionsUseCase';
import { GetPermissionsByRoleIdUseCase } from '../../useCases/getRolePermissionByIdUseCase';
import { UpdateRolePermissionUseCase } from '../../useCases/updateRolePermissionUseCase';
import { DeleteRolePermissionUseCase } from '../../useCases/deleteRolePermissionUseCase';

export async function createRolePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { roleId, permissionId } = createRolePermissionSchema.parse(
      request.body,
    );

    const createRolePermissionUseCase = container.resolve(
      CreateRolePermissionUseCase,
    );

    await createRolePermissionUseCase.execute({ roleId, permissionId });

    reply.status(201).send({ message: 'RolePermission created successfully' });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply.status(400).send({
      error: 'Failed to create RolePermission',
      details: error.message,
    });
  }
}

export async function getAllRolePermissionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllRolePermissionsUseCase = container.resolve(
      GetAllRolePermissionsUseCase,
    );

    const rolePermissions = await getAllRolePermissionsUseCase.execute();

    reply.status(200).send({ data: rolePermissions });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({
        error: 'Failed to fetch RolePermissions',
        details: error.message,
      });
  }
}

export async function getRolePermissionByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const getRolePermissionByIdUseCase = container.resolve(
      GetPermissionsByRoleIdUseCase,
    );

    const rolePermission = await getRolePermissionByIdUseCase.execute(id);

    if (!rolePermission) {
      reply.status(404).send({ message: 'RolePermission not found' });
      return;
    }

    reply.status(200).send({ data: rolePermission });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({
        error: 'Failed to fetch RolePermission',
        details: error.message,
      });
  }
}

export async function updateRolePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };
    const { roleId, permissionId } = request.body as {
      roleId?: string;
      permissionId?: string;
    };

    const updateRolePermissionUseCase = container.resolve(
      UpdateRolePermissionUseCase,
    );

    const updatedRolePermission = await updateRolePermissionUseCase.execute({
      id,
      newRoleId: roleId,
      newPermissionId: permissionId,
    });

    reply
      .status(200)
      .send({
        message: 'RolePermission updated successfully',
        data: updatedRolePermission,
      });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(400)
      .send({
        error: 'Failed to update RolePermission',
        details: error.message,
      });
  }
}

export async function deleteRolePermissionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params as { id: string };

    const deleteRolePermissionUseCase = container.resolve(
      DeleteRolePermissionUseCase,
    );

    await deleteRolePermissionUseCase.execute(id);

    reply.status(200).send({ message: 'RolePermission deleted successfully' });
  } catch (e) {
    const error = e as Error;
    console.error('Error caught:', error);
    reply
      .status(500)
      .send({
        error: 'Failed to delete RolePermission',
        details: error.message,
      });
  }
}
