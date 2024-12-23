import { injectable, inject } from 'tsyringe';
import { RolePermission } from '@prisma/client';
import { IRolePermissionRepository } from '../repositories/IRolePermissionRepository';
import { BadRequestError } from '@/utils/errors/badRequestError';

@injectable()
export class CreateRolePermissionUseCase {
  constructor(
    @inject('RolePermissionRepository')
    private rolePermissionRepository: IRolePermissionRepository,
  ) {}

  async execute({
    roleId,
    permissionId,
  }: {
    roleId: string;
    permissionId: string;
  }): Promise<RolePermission> {
    if (!roleId || !permissionId) {
      throw new BadRequestError('Role ID and Permission ID are required');
    }

    const isAssigned =
      await this.rolePermissionRepository.isPermissionAssignedToRole(
        roleId,
        permissionId,
      );

    if (isAssigned) {
      throw new BadRequestError('Permission is already assigned to the role');
    }

    const rolePermission =
      await this.rolePermissionRepository.createRolePermission(
        roleId,
        permissionId,
      );

    return rolePermission;
  }
}
