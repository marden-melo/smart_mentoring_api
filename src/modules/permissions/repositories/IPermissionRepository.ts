import { Permission } from '@prisma/client';
import { PermissionDTO, UpdatePermissionDTO } from '../dtos/permissionDTO';

export interface IPermissionRepository {
  create(data: PermissionDTO): Promise<Permission>;
  update(id: string, data: UpdatePermissionDTO): Promise<Permission>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
  findAllWithPagination(limit: number, offset: number): Promise<Permission[]>;
  countUsers(): Promise<number>;
}
