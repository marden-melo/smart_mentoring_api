import { prisma } from '@/lib/prisma';
import { ICustomFieldRepository } from '../ICustomFieldRepository';
import {
  CreateCustomFieldDTO,
  CustomFieldDTO,
  UpdateCustomFieldDTO,
} from '../../dtos/customFieldDTO';

export class CustomFieldRepository implements ICustomFieldRepository {
  async findById(id: string): Promise<CustomFieldDTO | null> {
    return await prisma.customField.findUnique({
      where: { id },
    });
  }

  async create(data: CreateCustomFieldDTO): Promise<CustomFieldDTO> {
    return await prisma.customField.create({
      data,
    });
  }

  async findByBudgetId(budgetId: string): Promise<CustomFieldDTO[]> {
    const fields = await prisma.customField.findMany({
      where: {
        budgetId: budgetId,
      },
    });
    return fields;
  }

  async update(
    id: string,
    data: UpdateCustomFieldDTO,
  ): Promise<CustomFieldDTO> {
    return prisma.customField.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.customField.delete({
      where: { id },
    });
  }
}
