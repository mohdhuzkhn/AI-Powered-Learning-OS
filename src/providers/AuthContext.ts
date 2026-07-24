import { createContext } from 'react';
import type { AppUser } from '../types/user.types';

export interface AuthContextValue {
  /** Null until the session is known (isLoading) or when signed out. */
  user: AppUser | null;
  /** True until the initial Firebase Auth session check completes. */
  isLoading: boolean;
  /** Business-friendly message from the most recent failed sign-in attempt. */
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

