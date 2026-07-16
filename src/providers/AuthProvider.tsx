import { useMemo, useState, type ReactNode } from 'react';
import type { AppUser, UserRole } from '../types/user.types';
import { AuthContext } from './AuthContext';
const demoUsers: Record<UserRole, AppUser> = {
  student: {
    id: 'student-demo',
    name: 'Ayesha Rahman',
    email: 'ayesha@learningos.dev',
    role: 'student',
  },
  admin: { id: 'admin-demo', name: 'Sarah Williams', email: 'sarah@learningos.dev', role: 'admin' },
};
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(demoUsers.student);
  const value = useMemo(
    () => ({
      user,
      isLoading: false,
      setDemoRole: (role: UserRole) => setUser(demoUsers[role]),
      signOut: () => setUser(null),
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
