import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../features/dashboard';
import { AppShell } from '../shared/layouts/AppShell';
import { ProtectedRoute } from './ProtectedRoute';
function LoginPage() {
  // Temporary placeholder — no redirect, no auth UI yet (that's the next
  // task). The previous version redirected to /dashboard, which combined
  // with ProtectedRoute redirecting unauthenticated users back to /login
  // caused an infinite render loop ("Maximum update depth exceeded").
  return (
    <main className="page-content">
      <h1>Login</h1>
      <p>Authentication is not implemented yet.</p>
    </main>
  );
}
function NotFoundPage() {
  return (
    <main className="error-state">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
    </main>
  );
}
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
