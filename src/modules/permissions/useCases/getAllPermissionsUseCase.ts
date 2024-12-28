import { injectable, inject } from 'tsyringe';
import { PermissionRepository } from '../repositories/prisma/permissionRepository';
import { Permission } from '@prisma/client';

@injectable()
export class GetAllPermissionsUseCase {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: PermissionRepository,
  ) {}

  async execute() {
    const permissions: Permission[] = await this.permissionRepository.findAll();

    return {
      data: permissions,
    };
  }
}
