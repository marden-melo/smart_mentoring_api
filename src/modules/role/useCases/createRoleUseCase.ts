import { injectable, inject } from 'tsyringe';
import { RoleRepository } from '../repositories/prisma/roleRepository';
import { RoleDTO } from '../dtos/roleDTO';
import { BadRequestError } from '@/utils/errors/badRequestError';

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: RoleRepository,
  ) {}

  async execute({ name }: RoleDTO): Promise<RoleDTO> {
    const existingRole = await this.roleRepository.findByName(name);
    if (existingRole) {
      throw new BadRequestError('Role with this name already exists.');
    }

    return await this.roleRepository.create({
      name,
    });
  }
}
