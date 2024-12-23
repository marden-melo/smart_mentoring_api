import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { PermissionRepository } from '../repositories/prisma/permissionRepository';

@injectable()
export class DeletePermissionUseCase {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: PermissionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const permission = await this.permissionRepository.findById(id);

    if (!permission) {
      throw new ResourceNotFoundError();
    }

    await this.permissionRepository.delete(id);
  }
}
