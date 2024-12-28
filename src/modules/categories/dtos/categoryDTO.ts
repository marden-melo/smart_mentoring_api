import { Category } from '@prisma/client';

export interface CategoryDTO {
  name: string;
  description?: string;
}

export interface CategoryWithIdDTO {
  id: string;
  name: string;
  description?: string | null;
}

export interface CategoryUseCaseResponse {
  data: Category | Category[];
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
}
