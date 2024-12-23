import { injectable, inject } from 'tsyringe';
import { RolePermission } from '@prisma/client';
import { IRolePermissionRepository } from '../repositories/IRolePermissionRepository';
import { BadRequestError } from '@/utils/errors/badRequestError';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetPermissionsByRoleIdUseCase {
  constructor(
    @inject('RolePermissionRepository')
    private rolePermissionRepository: IRolePermissionRepository,
  ) {}

  async execute(roleId: string): Promise<RolePermission[]> {
    if (!roleId) {
      throw new BadRequestError('Role ID is required');
    }

    const permissions =
      await this.rolePermissionRepository.findPermissionsByRoleId(roleId);

    if (permissions.length === 0) {
      throw new ResourceNotFoundError('No permissions found for this role');
    }

    return permissions;
  }
}
