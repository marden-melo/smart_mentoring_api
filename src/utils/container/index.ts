import { container } from 'tsyringe';

import { IPlanRepository } from '@/modules/plan/repositories/IPlanRepository';
import { PlanRepository } from '@/modules/plan/repositories/prisma/planRepository';
import { IRoleRepository } from '@/modules/role/repositories/IRoleRepository';
import { RoleRepository } from '@/modules/role/repositories/prisma/roleRepository';
import { IPermissionRepository } from '@/modules/permissions/repositories/IPermissionRepository';
import { PermissionRepository } from '@/modules/permissions/repositories/prisma/permissionRepository';
import { IRolePermissionRepository } from '@/modules/rolePermissions/repositories/IRolePermissionRepository';
import { RolePermissionRepository } from '@/modules/rolePermissions/repositories/prisma/rolePermissionRepository';
import { IUsersRepository } from '@/modules/user/repositories/IUserRepository';
import { UsersRepository } from '@/modules/user/repositories/prisma/usersRepository';
import { ICategoryRepository } from '@/modules/categories/repositories/ICategoryRepository';
import { CategoryRepository } from '@/modules/categories/repositories/prisma/categoryRepository';
import { IClientRepository } from '@/modules/client/repositories/IClientRepository';
import { ClientRepository } from '@/modules/client/repositories/prisma/clientRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPlanRepository>('PlanRepository', PlanRepository);

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository);

container.registerSingleton<IPermissionRepository>(
  'PermissionRepository',
  PermissionRepository,
);

container.registerSingleton<IRolePermissionRepository>(
  'RolePermissionRepository',
  RolePermissionRepository,
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository,
);
