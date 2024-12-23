import { injectable, inject } from 'tsyringe';
import { Permission, Role } from '@prisma/client';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { PermissionRepository } from '../repositories/prisma/permissionRepository';
import { UpdatePermissionDTO } from '../dtos/permissionDTO';

@injectable()
export class UpdatePermissionUseCase {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: PermissionRepository,
  ) {}

  async execute(id: string, data: UpdatePermissionDTO): Promise<Permission> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new ResourceNotFoundError('Permission not found');
    }

    return this.permissionRepository.update(id, data);
  }
}
