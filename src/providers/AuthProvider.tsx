import { useMemo, useState, type ReactNode } from 'react';
import type { AppUser, UserRole } from '../types/user.types';
import { AuthContext } from './AuthContext';
const now = new Date();
const demoUsers: Record<UserRole, AppUser> = {
  student: {
    uid: 'student-demo',
    fullName: 'Ayesha Rahman',
    email: 'ayesha@learningos.dev',
    role: 'student',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
  admin: {
    uid: 'admin-demo',
    fullName: 'Sarah Williams',
    email: 'sarah@learningos.dev',
    role: 'admin',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  },
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
