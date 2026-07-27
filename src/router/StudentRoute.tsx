import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Restricts nested routes to student users. Must be rendered inside
 * <ProtectedRoute> — it assumes `user` is already non-null and only
 * checks role.
 */
export function StudentRoute() {
  const { user } = useAuth();

  if (user?.role !== 'student') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}