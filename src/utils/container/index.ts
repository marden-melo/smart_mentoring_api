import { container } from 'tsyringe';

import { IRoleRepository } from '@/modules/role/repositories/IRoleRepository';
import { RoleRepository } from '@/modules/role/repositories/prisma/roleRepository';
import { IUsersRepository } from '@/modules/user/repositories/IUserRepository';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';
import { IUserMentorRepository } from '@/modules/user/repositories/IUserMentorRepository';

import { IUserConsultantRepository } from '@/modules/user/repositories/IUserConsultantRepository';
import { UserConsultantRepository } from '@/modules/user/repositories/prisma/userConsultantRepository';
import { UserMentorRepository } from '@/modules/user/repositories/prisma/userMentorRepository';
import { IExpertiseAreaRepository } from '@/modules/expertiseArea/repositories/IExpertiseAreaRepository';
import { ExpertiseAreaRepository } from '@/modules/expertiseArea/repositories/prisma/expertiseAreaRepository';
import { IMentorExpertiseRepository } from '@/modules/mentorExpertise/repositories/IMentorExpertiseRepository';
import { MentorExpertiseRepository } from '@/modules/mentorExpertise/repositories/prisma/mentorExpertiseRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserMentorRepository>(
  'UserMentorRepository',
  UserMentorRepository,
);

container.registerSingleton<IUserConsultantRepository>(
  'UserConsultantRepository',
  UserConsultantRepository,
);

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);

container.registerSingleton<IExpertiseAreaRepository>(
  'ExpertiseAreaRepository',
  ExpertiseAreaRepository,
);

container.registerSingleton<IMentorExpertiseRepository>(
  'MentorExpertiseRepository',
  MentorExpertiseRepository,
);
