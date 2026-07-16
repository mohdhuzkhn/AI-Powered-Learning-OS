import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from '../features/dashboard'
import { AppShell } from '../shared/layouts/AppShell'
import { ProtectedRoute } from './ProtectedRoute'
function LoginPage() { return <Navigate to="/dashboard" replace /> }
function NotFoundPage() { return <main className="error-state"><h1>Page not found</h1><p>The page you requested does not exist.</p></main> }
export function AppRouter() { return <BrowserRouter><Routes><Route path="/login" element={<LoginPage />} /><Route element={<ProtectedRoute />}><Route element={<AppShell />}><Route path="/dashboard" element={<DashboardPage />} /></Route></Route><Route path="/" element={<Navigate to="/dashboard" replace />} /><Route path="*" element={<NotFoundPage />} /></Routes></BrowserRouter> }
