import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../hooks/useAuth';
import { loginSchema, type LoginFormValues } from '../validators/auth.validator';

export function LoginPage() {
  const { user, isLoading, authError, signInWithGoogle, signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  // Session check still in flight — avoid flashing the form then
  // immediately redirecting once it resolves.
  if (isLoading) {
    return <div className="page-loader">Checking your session…</div>;
  }

  // Already signed in — nothing to do here.
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleSubmitting(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard', { replace: true });
    } catch {
      // authError is already set by AuthProvider — nothing else to do.
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await signInWithEmail(values.email, values.password);
      navigate('/dashboard', { replace: true });
    } catch {
      // authError is already set by AuthProvider.
    }
  };

  const busy = isGoogleSubmitting || isSubmitting;

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="brand-mark">L</span>
          <span>Learning OS</span>
        </div>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue your missions.</p>

        {authError && (
          <div className="auth-error" role="alert">
            {authError}
          </div>
        )}

        <button
          type="button"
          className="auth-google-button"
          onClick={() => void handleGoogleSignIn()}
          disabled={busy}
        >
          {isGoogleSubmitting ? 'Signing in…' : 'Continue with Google'}
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form className="auth-form" onSubmit={(event) => void handleSubmit(onSubmit)(event)} noValidate>
          <label className="auth-field">
            <span>Email</span>
            <input type="email" autoComplete="email" disabled={busy} {...register('email')} />
            {errors.email && <small className="auth-field-error">{errors.email.message}</small>}
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              autoComplete="current-password"
              disabled={busy}
              {...register('password')}
            />
            {errors.password && (
              <small className="auth-field-error">{errors.password.message}</small>
            )}
          </label>

          <Link to="/forgot-password" className="auth-forgot-link">
            Forgot password?
          </Link>

          <button type="submit" className="auth-submit-button" disabled={busy}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}