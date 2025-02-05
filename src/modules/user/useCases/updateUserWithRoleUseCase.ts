import { injectable, inject } from 'tsyringe';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { User } from '@prisma/client';
import { RoleType } from '@prisma/client';
import { UserMentorRepository } from '../repositories/prisma/userMentorRepository';
import { UserConsultantRepository } from '../repositories/prisma/userConsultantRepository';
import { prisma } from '@/lib/prisma';

@injectable()
export class UpdateUserWithRoleUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('UserMentorRepository')
    private mentorRepository: UserMentorRepository,
    @inject('UserConsultantRepository')
    private consultantRepository: UserConsultantRepository,
  ) {}

  async execute(
    userId: string,
    data: Partial<User>,
    roleType: RoleType,
    additionalData: any,
  ): Promise<any> {
    const updatedUser = await this.usersRepository.update(userId, data);

    const updatedRole = await prisma.role.findUnique({
      where: { name: roleType },
    });

    if (updatedRole) {
      await prisma.user.update({
        where: { id: userId },
        data: { roleId: updatedRole.id },
      });
    }

    const existingMentor = await this.mentorRepository.findByUserId(userId);
    const existingConsultant =
      await this.consultantRepository.findByUserId(userId);

    if (roleType === 'MENTOR' && existingConsultant) {
      throw new Error(
        'User cannot be both Mentor and Consultant at the same time',
      );
    }

    if (roleType === 'CONSULTANT' && existingMentor) {
      throw new Error(
        'User cannot be both Mentor and Consultant at the same time',
      );
    }

    if (roleType === 'MENTOR') {
      await this.mentorRepository.upsert({
        where: { userId },
        update: { ...additionalData },
        create: { user: { connect: { id: userId } }, ...additionalData },
      });
    }

    if (roleType === 'CONSULTANT') {
      await this.consultantRepository.upsert({
        where: { userId },
        update: { ...additionalData },
        create: { user: { connect: { id: userId } }, ...additionalData },
      });
    }

    const userWithFullData = await this.usersRepository.findById(userId);

    return userWithFullData;
  }
}
