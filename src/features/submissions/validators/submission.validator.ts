import { z } from 'zod';

const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;

/**
 * Matches docs/03-Features/04-Submission-System.md's Validation Rules:
 * screenshot required/image only/max 5MB, description required/max 2000.
 */
/**
 * Matches docs/03-Features/04-Submission-System.md's Validation Rules:
 * screenshot required/image only/max 5MB, description required/max 2000.
 *
 * `screenshot` validates a FileList (what react-hook-form's native file
 * input registration actually reports — `{...register('screenshot')}` on
 * `<input type="file">` gives `event.target.files`, a FileList, never a
 * bare File) and transforms it down to the single File the rest of the
 * app works with.
 */
export const submissionFormSchema = z.object({
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(2000, 'Description must be 2000 characters or fewer.'),
  screenshot: z
    .instanceof(FileList, { message: 'A screenshot is required.' })
    .refine((files) => files.length > 0, 'A screenshot is required.')
    .refine(
      (files) => (files[0]?.size ?? 0) <= MAX_SCREENSHOT_BYTES,
      'Screenshot must be 5MB or smaller.',
    )
    .refine((files) => files[0]?.type.startsWith('image/') ?? false, 'Screenshot must be an image file.')
    .transform((files) => files[0]),
});

export type SubmissionFormInput = z.input<typeof submissionFormSchema>;
export type SubmissionFormValues = z.output<typeof submissionFormSchema>;

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
