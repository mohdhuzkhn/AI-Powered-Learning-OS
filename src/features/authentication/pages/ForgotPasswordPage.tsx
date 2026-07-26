import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthError, AuthService } from '../services/AuthService';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../validators/auth.validator';

export function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setErrorMessage(null);
    try {
      await AuthService.sendPasswordReset(values.email);
      setIsSent(true);
    } catch (error) {
      setErrorMessage(error instanceof AuthError ? error.message : 'Unable to send reset email.');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-mark">L</span>
          <span>Learning OS</span>
        </div>
        <h1>Reset your password</h1>
        <p className="auth-subtitle">Enter your account email and we&apos;ll send you a reset link.</p>

        {isSent ? (
          <div className="auth-success" role="status">
            If an account exists for that email, a reset link is on its way.
          </div>
        ) : (
          <form
            className="auth-form"
            onSubmit={(event) => void handleSubmit(onSubmit)(event)}
            noValidate
          >
            {errorMessage && (
              <div className="auth-error" role="alert">
                {errorMessage}
              </div>
            )}
            <label className="auth-field">
              <span>Email</span>
              <input type="email" autoComplete="email" disabled={isSubmitting} {...register('email')} />
              {errors.email && <small className="auth-field-error">{errors.email.message}</small>}
            </label>
            <button type="submit" className="auth-submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send reset link'}
            </button>
          </form>
        )}

        <Link to="/login" className="auth-back-link">
          ← Back to sign in
        </Link>
      </div>
    </main>
  );
}