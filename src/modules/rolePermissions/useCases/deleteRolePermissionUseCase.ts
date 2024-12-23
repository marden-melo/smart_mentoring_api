import { injectable, inject } from 'tsyringe';
import { RolePermission } from '@prisma/client';
import { IRolePermissionRepository } from '../repositories/IRolePermissionRepository';
import { BadRequestError } from '@/utils/errors/badRequestError';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class DeleteRolePermissionUseCase {
  constructor(
    @inject('RolePermissionRepository')
    private rolePermissionRepository: IRolePermissionRepository,
  ) {}

  async execute(id: string): Promise<RolePermission> {
    if (!id) {
      throw new BadRequestError('ID is required');
    }

    const rolePermission =
      await this.rolePermissionRepository.findRolePermissionById(id);

    if (!rolePermission) {
      throw new ResourceNotFoundError('RolePermission not found');
    }

    return this.rolePermissionRepository.deleteRolePermission(id);
  }
}
