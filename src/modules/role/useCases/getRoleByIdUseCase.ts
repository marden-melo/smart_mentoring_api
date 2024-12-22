import { injectable, inject } from 'tsyringe';
import { Role } from '@prisma/client';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { RoleRepository } from '../repositories/prisma/roleRepository';

@injectable()
export class GetRoleByIdUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: RoleRepository,
  ) {}

  async execute(id: string): Promise<{ data: Role }> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new ResourceNotFoundError();
    }

    return {
      data: role,
    };
  }
}
