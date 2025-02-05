import { Mentor, Prisma } from '@prisma/client';

export interface IUserMentorRepository {
  upsert(data: {
    where: { userId: string };
    update: Partial<Mentor>;
    create: Prisma.MentorCreateInput;
  }): Promise<Mentor>;

  findByUserId(userId: string): Promise<Mentor | null>;

  create(data: Prisma.MentorCreateInput): Promise<Mentor>;

  update(userId: string, data: Partial<Mentor>): Promise<Mentor>;
}
