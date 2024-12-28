import { injectable, inject } from 'tsyringe';
import { PermissionRepository } from '../repositories/prisma/permissionRepository';
import {
  PermissionDTO,
  PermissionUseCaseResponse,
} from '../dtos/permissionDTO';
import { BadRequestError } from '@/utils/errors/badRequestError';

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
    const existingPermission = await this.permissionRepository.findByName(name);
    if (existingPermission) {
      throw new BadRequestError('Permission name already exists.');
    }

    const permission = await this.permissionRepository.create({
      name,
      description,
    });

    return {
      data: permission,
    };
  }
}
