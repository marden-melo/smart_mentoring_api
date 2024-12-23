import { injectable, inject } from 'tsyringe';
import { RolePermission } from '@prisma/client';
import { IRolePermissionRepository } from '../repositories/IRolePermissionRepository';
import { BadRequestError } from '@/utils/errors/badRequestError';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class UpdateRolePermissionUseCase {
  constructor(
    @inject('RolePermissionRepository')
    private rolePermissionRepository: IRolePermissionRepository,
  ) {}

  async execute({
    id,
    newRoleId,
    newPermissionId,
  }: {
    id: string;
    newRoleId?: string;
    newPermissionId?: string;
  }): Promise<RolePermission> {
    if (!id) {
      throw new BadRequestError('ID is required');
    }

    const rolePermission =
      await this.rolePermissionRepository.findRolePermissionById(id);

    if (!rolePermission) {
      throw new ResourceNotFoundError('RolePermission not found');
    }

    if (!newRoleId && !newPermissionId) {
      throw new BadRequestError('At least one field to update is required');
    }

    return this.rolePermissionRepository.updateRolePermission(
      id,
      newRoleId,
      newPermissionId,
    );
  }
}
