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
import { IBonusRepository } from '@/modules/bonus/repositories/IBonusRepository';
import { BonusRepository } from '@/modules/bonus/repositories/prisma/bonusRepository';
import { IProductOrServiceRepository } from '@/modules/productsOrServices/repositories/IProductOrServiceRepository';
import { ProductOrServiceRepository } from '@/modules/productsOrServices/repositories/prisma/productOrServiceRepository';
import { IPaymentPlanRepository } from '@/modules/paymentPlan/repositories/IPaymentPlanRepository';
import { PaymentPlanRepository } from '@/modules/paymentPlan/repositories/prisma/paymentPlanRepository';
import { ICustomFieldRepository } from '@/modules/customFields/repositories/ICustomFieldRepository';
import { CustomFieldRepository } from '@/modules/customFields/repositories/prisma/customFieldRepository';
import { ISubscriptionRepository } from '@/modules/subscription/repositories/ISubscriptionRepository';
import { SubscriptionRepository } from '@/modules/subscription/repositories/prisma/subscriptionRepository';
import { ISubscriptionHistoryRepository } from '@/modules/SubscriptionHistory/repositories/ISubscriptionHistoryRepository';
import { SubscriptionHistoryRepository } from '@/modules/SubscriptionHistory/repositories/prisma/subscriptionHistoryRepository';
import { INotificationRepository } from '@/modules/notifications/repositories/INotificationRepository';
import { NotificationRepository } from '@/modules/notifications/repositories/prisma/notificationRepository';
import { IBudgetRepository } from '@/modules/budget/repositories/IBudgetRepository';
import { BudgetRepository } from '@/modules/budget/repositories/prisma/budgetRepository';

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

container.registerSingleton<IBonusRepository>(
  'BonusRepository',
  BonusRepository,
);

container.registerSingleton<IProductOrServiceRepository>(
  'ProductOrServiceRepository',
  ProductOrServiceRepository,
);

container.registerSingleton<IPaymentPlanRepository>(
  'PaymentPlanRepository',
  PaymentPlanRepository,
);

container.registerSingleton<ICustomFieldRepository>(
  'CustomFieldRepository',
  CustomFieldRepository,
);

container.registerSingleton<ISubscriptionRepository>(
  'SubscriptionRepository',
  SubscriptionRepository,
);

container.registerSingleton<ISubscriptionHistoryRepository>(
  'SubscriptionHistoryRepository',
  SubscriptionHistoryRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);

container.registerSingleton<IBudgetRepository>(
  'BudgetRepository',
  BudgetRepository,
);
