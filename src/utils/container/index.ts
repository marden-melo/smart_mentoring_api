import { UsersRepository } from '@/modules/user/repositories/prisma/userRepository';

import { container } from 'tsyringe';

import { IUsersRepository } from '@/modules/user/repositories/IUserRepository';
import { IPlanRepository } from '@/modules/plan/repositories/IPlanRepository';
import { PlanRepository } from '@/modules/plan/repositories/prisma/planRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPlanRepository>('PlanRepository', PlanRepository);
