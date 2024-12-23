import { injectable, inject } from 'tsyringe';
import { Permission } from '@prisma/client';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { PermissionRepository } from '../repositories/prisma/permissionRepository';

@injectable()
export class GetPermissionByIdUseCase {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: PermissionRepository,
  ) {}

  async execute(id: string): Promise<{ data: Permission }> {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new ResourceNotFoundError();
    }

    return {
      data: permission,
    };
  }
}
