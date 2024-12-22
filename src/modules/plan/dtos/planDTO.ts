import { Plan } from '@prisma/client';

export interface PlanDTO {
  name: string;
  price: number;
}

export interface PlanUseCaseResponse {
  data: Plan | Plan[];
}
