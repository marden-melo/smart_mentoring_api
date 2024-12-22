import { injectable, inject } from 'tsyringe';
import { Role } from '@prisma/client';
import { IRoleRepository } from '../repositories/IRoleRepository';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: IRoleRepository,
  ) {}

  async execute(id: string, data: Partial<Role>): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new ResourceNotFoundError('Role not found');
    }

    return this.roleRepository.update(id, data);
  }
}
