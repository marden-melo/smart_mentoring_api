import { injectable, inject } from 'tsyringe';
import { RoleRepository } from '../repositories/prisma/roleRepository';
import { RoleDTO, RoleUseCaseResponse } from '../dtos/roleDTO';

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: RoleRepository,
  ) {}

  async execute({ name }: RoleDTO): Promise<RoleUseCaseResponse> {
    const role = await this.roleRepository.create({
      name,
    });

    return {
      data: role,
    };
  }
}
