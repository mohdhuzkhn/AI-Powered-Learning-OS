import { z } from 'zod';

const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;

/**
 * Matches docs/03-Features/04-Submission-System.md's Validation Rules:
 * screenshot required/image only/max 5MB, description required/max 2000.
 */
export const submissionFormSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(2000, 'Description must be 2000 characters or fewer.'),
  screenshot: z
    .instanceof(File, { message: 'A screenshot is required.' })
    .refine((file) => file.size > 0, 'A screenshot is required.')
    .refine((file) => file.size <= MAX_SCREENSHOT_BYTES, 'Screenshot must be 5MB or smaller.')
    .refine((file) => file.type.startsWith('image/'), 'Screenshot must be an image file.'),
});

export type SubmissionFormValues = z.infer<typeof submissionFormSchema>;

/**
 * BR-SUB-007 ("every review should contain a decision") is enforced by
 * `decision` being a required enum, not optional. Feedback itself isn't
 * marked mandatory anywhere in the spec, so it stays optional here —
 * capped at the same length as the submission description for consistency.
 */
export const reviewFormSchema = z.object({
  decision: z.enum(['approved', 'rejected']),
  feedback: z.string().max(2000, 'Feedback must be 2000 characters or fewer.'),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
