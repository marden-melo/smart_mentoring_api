import { Role } from '@prisma/client';

export interface RoleDTO {
  name: string;
}

export interface RoleUseCaseResponse {
  data: Role | Role[];
}

export type UpdateRoleDTO = Partial<RoleDTO>;
