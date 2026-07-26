import { z } from 'zod';

/**
 * Matches the validation rules documented in
 * docs/03-Features/01-Authentication.md — email required/valid/max 100
 * chars, password 8–64 chars.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .max(100, 'Email must be 100 characters or fewer.')
    .email('Enter a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(64, 'Password must be 64 characters or fewer.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .max(100, 'Email must be 100 characters or fewer.')
    .email('Enter a valid email address.'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;