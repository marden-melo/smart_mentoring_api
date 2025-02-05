import { injectable, inject } from 'tsyringe';
import { UsersRepository } from '../repositories/prisma/usersRepository';
import { User, RoleType } from '@prisma/client';
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
    additionalData: { expertiseIds: string[]; [key: string]: any },
  ): Promise<any> {
    await this.usersRepository.update(userId, data);

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

    if (
      !additionalData.expertiseIds ||
      additionalData.expertiseIds.length === 0
    ) {
      throw new Error(`${roleType} must have at least one area of expertise.`);
    }

    if (roleType === 'MENTOR') {
      const { expertiseIds, ...mentorFields } = additionalData;
      await this.mentorRepository.upsert({
        where: { userId },
        update: mentorFields,
        create: { user: { connect: { id: userId } }, ...mentorFields },
        expertiseIds,
      });
    }

    if (roleType === 'CONSULTANT') {
      const { expertiseIds, professionalSince, ...consultantFields } =
        additionalData;

      if (!professionalSince) {
        throw new Error('Consultant must have a professionalSince date.');
      }

      await this.consultantRepository.upsert({
        where: { userId },
        update: consultantFields,
        create: {
          user: { connect: { id: userId } },
          professionalSince: new Date(professionalSince),
          ...consultantFields,
        },
        expertiseIds,
      });
    }

    const userWithFullData = await this.usersRepository.findById(userId);
    return userWithFullData;
  }
}
