import { PrismaClient, RolePermission } from '@prisma/client';
import { IRolePermissionRepository } from '../IRolePermissionRepository';

export class RolePermissionRepository implements IRolePermissionRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createRolePermission(
    roleId: string,
    permissionId: string,
  ): Promise<RolePermission> {
    return this.prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  }

  async findPermissionsByRoleId(roleId: string): Promise<RolePermission[]> {
    return this.prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
  }

  async findRolesWithPermissions(): Promise<any[]> {
    return this.prisma.role.findMany({
      include: { permissions: { include: { permission: true } } },
    });
  }

  async findRolePermissionById(id: string): Promise<RolePermission | null> {
    return this.prisma.rolePermission.findUnique({
      where: { id },
    });
  }

  async deleteRolePermission(id: string): Promise<RolePermission> {
    return this.prisma.rolePermission.delete({
      where: { id },
    });
  }

  async isPermissionAssignedToRole(
    roleId: string,
    permissionId: string,
  ): Promise<boolean> {
    const count = await this.prisma.rolePermission.count({
      where: { roleId, permissionId },
    });
    return count > 0;
  }

  async updateRolePermission(
    id: string,
    newRoleId?: string,
    newPermissionId?: string,
  ): Promise<RolePermission> {
    const data: Partial<RolePermission> = {};
    if (newRoleId) data.roleId = newRoleId;
    if (newPermissionId) data.permissionId = newPermissionId;

    return this.prisma.rolePermission.update({
      where: { id },
      data,
    });
  }
}
