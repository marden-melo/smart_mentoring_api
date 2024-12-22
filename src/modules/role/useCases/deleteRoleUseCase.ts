import { injectable, inject } from 'tsyringe';
import { ResourceNotFoundError } from '@/utils/errors/resourceNotFoundError';
import { RoleRepository } from '../repositories/prisma/roleRepository';

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: RoleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new ResourceNotFoundError();
    }

    await this.roleRepository.delete(id);
  }
}
