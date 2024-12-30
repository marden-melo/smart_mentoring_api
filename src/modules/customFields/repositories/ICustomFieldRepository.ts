import {
  CreateCustomFieldDTO,
  CustomFieldDTO,
  UpdateCustomFieldDTO,
} from '../dtos/customFieldDTO';

export interface ICustomFieldRepository {
  create(data: CreateCustomFieldDTO): Promise<CustomFieldDTO>;
  findByBudgetId(budgetId: string): Promise<CustomFieldDTO[]>;
  findById(id: string): Promise<CustomFieldDTO | null>;
  update(id: string, data: UpdateCustomFieldDTO): Promise<CustomFieldDTO>;
  delete(id: string): Promise<void>;
}
