import { z } from 'zod';

export const expertiseAreaSchema = z.object({
  name: z.string().min(1, { message: 'Description is required' }),
});

export type ExpertiseAreaSchema = z.infer<typeof expertiseAreaSchema>;
