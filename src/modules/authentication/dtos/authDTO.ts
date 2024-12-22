import { User } from '@prisma/client';

export interface AuthDTO {
  email: string;
  password: string;
}

export interface AuthUseCaseResponse {
  user: User;
}
