import { RolePermission } from '@prisma/client';

export interface IRolePermissionRepository {
  createRolePermission(
    roleId: string,
    permissionId: string,
  ): Promise<RolePermission>;
  findPermissionsByRoleId(roleId: string): Promise<RolePermission[]>;
  findRolesWithPermissions(): Promise<any[]>;
  findRolePermissionById(id: string): Promise<RolePermission | null>;
  deleteRolePermission(id: string): Promise<RolePermission>;
  isPermissionAssignedToRole(
    roleId: string,
    permissionId: string,
  ): Promise<boolean>;
  updateRolePermission(
    id: string,
    newRoleId?: string,
    newPermissionId?: string,
  ): Promise<RolePermission>;
}
