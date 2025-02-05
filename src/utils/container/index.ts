import { container } from 'tsyringe';

import { IRoleRepository } from '@/modules/role/repositories/IRoleRepository';
import { RoleRepository } from '@/modules/role/repositories/prisma/roleRepository';
import { IUsersRepository } from '@/modules/user/repositories/IUserRepository';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';
import { IUserMentorRepository } from '@/modules/user/repositories/IUserMentorRepository';
import { UserMentorRepository } from '@/modules/user/repositories/prisma/usermentorRepository';
import { IUserConsultantRepository } from '@/modules/user/repositories/IUserConsultantRepository';
import { UserConsultantRepository } from '@/modules/user/repositories/prisma/userConsultantRepository';

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
