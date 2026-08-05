import { z } from 'zod';
import { MISSION_CATEGORIES } from '../types/mission.types';

/**
 * Matches docs/03-Features/03-Mission-System.md's Validation Rules
 * section: title required/max 100, description required/max 5000,
 * deadline required/future date only, difficulty required, category
 * required.
 */
export const missionFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(100, 'Title must be 100 characters or fewer.'),
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(5000, 'Description must be 5000 characters or fewer.'),
  category: z.enum(MISSION_CATEGORIES),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  deadline: z.coerce
    .date()
    .refine((date) => date.getTime() > Date.now(), 'Deadline must be in the future.'),
  status: z.enum(['draft', 'published']),
});

export type MissionFormInput = z.input<typeof missionFormSchema>;
export type MissionFormValues = z.output<typeof missionFormSchema>;