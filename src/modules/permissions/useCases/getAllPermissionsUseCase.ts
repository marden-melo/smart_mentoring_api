import { injectable, inject } from 'tsyringe';
import { PermissionRepository } from '../repositories/prisma/permissionRepository';
import { Permission } from '@prisma/client';

@injectable()
export class GetAllPermissionsUseCase {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: PermissionRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const permissions: Permission[] =
      await this.permissionRepository.findAllWithPagination(limit, offset);
    const total = await this.permissionRepository.countUsers();

    return {
      data: permissions,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
