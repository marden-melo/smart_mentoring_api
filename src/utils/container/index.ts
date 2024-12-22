import { UsersRepository } from '@/modules/user/repositories/prisma/userRepository';

import { container } from 'tsyringe';

import { IUsersRepository } from '@/modules/user/repositories/IUserRepository';
import { IPlanRepository } from '@/modules/plan/repositories/IPlanRepository';
import { PlanRepository } from '@/modules/plan/repositories/prisma/planRepository';
import { IRoleRepository } from '@/modules/role/repositories/IRoleRepository';
import { RoleRepository } from '@/modules/role/repositories/prisma/roleRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPlanRepository>('PlanRepository', PlanRepository);

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);
