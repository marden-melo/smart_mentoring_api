import { prisma } from '@/lib/prisma';
import { IRoleRepository } from '../IRoleRepository';
import { RoleDTO } from '../../dtos/roleDTO';

export class RoleRepository implements IRoleRepository {
  async findAll() {
    return prisma.role.findMany();
  }

  async findById(id: string) {
    return prisma.role.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return prisma.role.findUnique({
      where: { name },
    });
  }

  async create(data: RoleDTO) {
    return prisma.role.create({
      data,
    });
  }

  async update(id: string, data: Partial<RoleDTO>) {
    return prisma.role.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await prisma.role.delete({
      where: { id },
    });
  }
}
