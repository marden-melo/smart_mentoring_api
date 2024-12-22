import { injectable, inject } from 'tsyringe';
import { Plan, Role } from '@prisma/client';
import { RoleRepository } from '../repositories/prisma/roleRepository';

@injectable()
export class GetAllRolesUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: RoleRepository,
  ) {}

  async execute(): Promise<{
    data: Role[];
  }> {
    const roles: Role[] = await this.roleRepository.findAll();

    return {
      data: roles,
    };
  }
}
