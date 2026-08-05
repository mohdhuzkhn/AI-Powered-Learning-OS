import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminDashboardPage, StudentDashboardPage } from '../features/dashboard';
import { ForgotPasswordPage, LoginPage } from '../features/authentication';
import { AdminMissionDetailsPage, AdminMissionListPage, MissionFormPage } from '../features/missions';
import { AppShell } from '../shared/layouts/AppShell';
import { AdminRoute } from './AdminRoute';
import { DashboardRedirect } from './DashboardRedirect';
import { ProtectedRoute } from './ProtectedRoute';
import { StudentRoute } from './StudentRoute';
import { UnauthorizedPage } from './UnauthorizedPage';
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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route element={<AppShell />}>
            <Route element={<StudentRoute />}>
              <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/missions" element={<AdminMissionListPage />} />
              <Route path="/admin/missions/create" element={<MissionFormPage />} />
              <Route path="/admin/missions/:missionId/edit" element={<MissionFormPage />} />
              <Route path="/admin/missions/:missionId" element={<AdminMissionDetailsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}