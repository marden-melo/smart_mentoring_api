import { z } from 'zod';

export const mentorExpertiseSchema = z.object({
  mentorId: z.string().min(1, 'mentorId é obrigatório'),
  expertiseId: z.string().min(1, 'expertiseId é obrigatório'),
});

export type MentorExpertiseSchema = z.infer<typeof mentorExpertiseSchema>;
