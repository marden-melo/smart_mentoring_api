export interface CreateCustomFieldDTO {
  budgetId: string;
  name: string;
  value: string;
}

export interface UpdateCustomFieldDTO {
  name?: string;
  value?: string;
}

export interface CustomFieldDTO {
  id: string;
  budgetId: string;
  name: string;
  value: string;
}
