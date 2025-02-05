import { Consultant } from '@prisma/client';
import { Prisma } from '@prisma/client';

export interface IUserConsultantRepository {
  upsert(data: {
    where: { userId: string };
    update: Partial<Consultant>;
    create: Prisma.ConsultantCreateInput;
  }): Promise<Consultant>;

  findByUserId(userId: string): Promise<Consultant | null>;

  create(data: Prisma.ConsultantCreateInput): Promise<Consultant>;

  update(userId: string, data: Partial<Consultant>): Promise<Consultant>;
}
