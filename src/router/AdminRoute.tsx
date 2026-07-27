import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Restricts nested routes to admin users. Must be rendered inside
 * <ProtectedRoute> — it assumes `user` is already non-null (ProtectedRoute
 * has already redirected unauthenticated visitors to /login) and only
 * checks role.
 */
export function AdminRoute() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}