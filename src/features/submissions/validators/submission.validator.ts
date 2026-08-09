import { z } from 'zod';

const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;

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
 * The admin review form only ever collects feedback — the decision
 * (approved/rejected) comes from which of two separate buttons the admin
 * clicks, not from a form field, so it has no place in this schema.
 * BR-SUB-007 ("every review should contain a decision") is still
 * enforced — SubmissionReviewInput requires `decision` as a mandatory
 * TypeScript field regardless of how the UI supplies it, which is a
 * stronger guarantee than a Zod field would add here. Feedback itself
 * isn't marked mandatory anywhere in the spec, so it stays optional.
 */
export const reviewFeedbackSchema = z.object({
  feedback: z.string().max(2000, 'Feedback must be 2000 characters or fewer.'),
});

export type ReviewFeedbackValues = z.infer<typeof reviewFeedbackSchema>;
