import { injectable, inject } from 'tsyringe';
import { IRolePermissionRepository } from '../repositories/IRolePermissionRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class GetAllRolePermissionsUseCase {
  constructor(
    @inject('RolePermissionRepository')
    private rolePermissionRepository: IRolePermissionRepository,
  ) {}

  async execute(): Promise<any[]> {
    const rolesWithPermissions =
      await this.rolePermissionRepository.findRolesWithPermissions();

    if (rolesWithPermissions.length === 0) {
      throw new ResourceNotFoundError('No roles with permissions found');
    }

    return rolesWithPermissions;
  }
}
