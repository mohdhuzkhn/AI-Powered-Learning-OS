import { Link } from 'react-router-dom';

export function UnauthorizedPage() {
  return (
    <main className="error-state">
      <h1>Access denied</h1>
      <p>You don&apos;t have permission to view this page.</p>
      <Link to="/dashboard" className="auth-back-link">
        ← Back to dashboard
      </Link>
    </main>
  );
}