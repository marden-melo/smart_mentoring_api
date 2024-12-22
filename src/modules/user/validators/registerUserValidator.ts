import { RoleType } from '@prisma/client';
import { z } from 'zod';

const userValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long.')
    .max(100, 'Name can be at most 100 characters long.'),
  email: z
    .string()
    .email('Invalid email format.')
    .min(5, 'Email must be at least 5 characters long.')
    .max(255, 'Email can be at most 255 characters long.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(255, 'Password can be at most 255 characters long.'),
  roleId: z.string().uuid('Invalid UUID format for role ID.'),
  isActive: z.boolean().default(true),
  role: z.nativeEnum(RoleType, {
    required_error: 'Role is required.',
    invalid_type_error: 'Invalid role type.',
  }),
});

export default userValidationSchema;
