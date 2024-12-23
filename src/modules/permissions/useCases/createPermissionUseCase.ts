import { injectable, inject } from 'tsyringe';
import { PermissionRepository } from '../repositories/prisma/permissionRepository';
import {
  PermissionDTO,
  PermissionUseCaseResponse,
} from '../dtos/permissionDTO';

@injectable()
export class CreatePermissionUseCase {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: PermissionRepository,
  ) {}

  async execute({
    name,
    description,
  }: PermissionDTO): Promise<PermissionUseCaseResponse> {
    const permission = await this.permissionRepository.create({
      name,
      description,
    });

    return {
      data: permission,
    };
  }
}
