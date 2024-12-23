import { z } from 'zod';

export const createRolePermissionSchema = z.object({
  roleId: z
    .string()
    .uuid({ message: 'ID not found' })
    .nonempty({ message: 'ID required' }),
  permissionId: z
    .string()
    .uuid({ message: 'ID not found' })
    .nonempty({ message: 'ID required' }),
});
