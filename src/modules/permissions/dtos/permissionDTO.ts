import { Permission } from '@prisma/client';

export interface PermissionDTO {
  name: string;
  description?: string;
}

export interface PermissionUseCaseResponse {
  data: Permission | Permission[];
}

export interface UpdatePermissionDTO {
  name?: string;
  description?: string;
}
