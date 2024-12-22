import { Role } from '@prisma/client';
import { RoleDTO } from '../dtos/roleDTO';

export interface IRoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: string): Promise<Role | null>;
  findByName(name: string): Promise<Role | null>;
  create(data: RoleDTO): Promise<Role>;
  update(id: string, data: Partial<RoleDTO>): Promise<Role>;
  delete(id: string): Promise<void>;
}
