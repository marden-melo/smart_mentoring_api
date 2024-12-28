import { z } from 'zod';

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default authBodySchema;
