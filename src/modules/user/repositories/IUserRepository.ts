import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  findAll(): Promise<User[]>;
  delete(id: string): Promise<void>;
  update(id: string, data: Partial<Prisma.UserUpdateInput>): Promise<User>;
  findAllWithPagination(limit: number, offset: number): Promise<User[]>;
  countUsers(): Promise<number>;
}
