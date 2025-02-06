import { z } from 'zod';

export const consultantExpertiseSchema = z.object({
  consultantId: z.string().min(1, 'mentorId é obrigatório'),
  expertiseId: z.string().min(1, 'expertiseId é obrigatório'),
});

export type ConsultantExpertiseSchema = z.infer<
  typeof consultantExpertiseSchema
>;
