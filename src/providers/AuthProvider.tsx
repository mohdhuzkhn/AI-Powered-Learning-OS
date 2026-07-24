import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { AuthError, AuthService } from '../features/authentication/services/AuthService';
import type { AppUser } from '../types/user.types';
import { AuthContext, type AuthContextValue } from './AuthContext';

function toMessage(error: unknown): string {
  return error instanceof AuthError ? error.message : 'Unable to sign in. Please try again.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Restores the session on page load/refresh and reacts to token expiry
  // or sign-out triggered elsewhere. Explicit sign-in calls below set
  // `user` directly from their own result — see the `inFlightUid` guard
  // in AuthService for why this listener intentionally ignores those same
  // auth state changes instead of racing to resolve the profile twice.
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    try {
      setUser(await AuthService.signInWithGoogle());
    } catch (error) {
      setAuthError(toMessage(error));
      throw error;
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    try {
      setUser(await AuthService.signInWithEmail(email, password));
    } catch (error) {
      setAuthError(toMessage(error));
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    await AuthService.signOut();
    setUser(null);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, authError, signInWithGoogle, signInWithEmail, signOut, clearAuthError }),
    [user, isLoading, authError, signInWithGoogle, signInWithEmail, signOut, clearAuthError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
