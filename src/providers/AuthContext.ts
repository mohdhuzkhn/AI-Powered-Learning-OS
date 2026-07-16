import { createContext } from 'react';
import type { AppUser, UserRole } from '../types/user.types';

export interface AuthContextValue {
  user: AppUser | null;
  isLoading: boolean;
  setDemoRole: (role: UserRole) => void;
  signOut: () => void;
}
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
