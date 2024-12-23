import { Permission, PrismaClient } from '@prisma/client';
import { IPermissionRepository } from '../IPermissionRepository';
import { PermissionDTO, UpdatePermissionDTO } from '../../dtos/permissionDTO';

const prisma = new PrismaClient();

export class PermissionRepository implements IPermissionRepository {
  async create(data: PermissionDTO) {
    return prisma.permission.create({
      data: {
        name: data.name,
        description: data.description || null,
      },
    });
  }

  async update(id: string, data: UpdatePermissionDTO): Promise<Permission> {
    return prisma.permission.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async delete(id: string) {
    await prisma.permission.delete({
      where: { id: id },
    });
  }

  async findById(id: string) {
    return prisma.permission.findUnique({
      where: { id: id },
    });
  }

  async findAll() {
    return prisma.permission.findMany();
  }

  async findAllWithPagination(limit: number, offset: number) {
    const permission = await prisma.permission.findMany({
      skip: offset,
      take: limit,
    });
    return permission;
  }

  async countUsers() {
    const total = await prisma.user.count();
    return total;
  }
}
