import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * /dashboard is kept as a stable, role-agnostic entry point (used by
 * LoginPage, UnauthorizedPage, AppShell nav, and the "/" redirect) so none
 * of those call sites need to know or compute the user's role themselves.
 * This component is the only place that decides where "/dashboard"
 * actually goes, per the route table in docs/03-Features/01-Authentication.md.
 */
export function DashboardRedirect() {
  const { user } = useAuth();
  const target = user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
  return <Navigate to={target} replace />;
}
