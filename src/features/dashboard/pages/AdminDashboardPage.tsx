import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { formatDashboardDate, getTimeBasedGreeting } from '../../../utils/greeting';
import { DashboardService } from '../services/DashboardService';
import { EmptyState } from '../../../shared/components/EmptyState';

type StatsState =
  | { status: 'loading' }
  | { status: 'loaded'; activeStudents: number }
  | { status: 'error' };

export function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    DashboardService.getAdminStats()
      .then((result) => {
        if (!cancelled) setStats({ status: 'loaded', activeStudents: result.activeStudents });
      })
      .catch((error: unknown) => {
        // Isolated widget failure — per docs/03-Features/02-Dashboard.md
        // "A broken widget must never crash the dashboard." Logged so a
        // rules/config problem is diagnosable, not silently swallowed.
        console.error('Failed to load admin dashboard stats:', error);
        if (!cancelled) setStats({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <section className="welcome">
        <div>
          <span className="eyebrow">{formatDashboardDate()}</span>
          <h1>
            {getTimeBasedGreeting()}, {user?.fullName}
          </h1>
          <p>Here’s what needs your attention today.</p>
        </div>
        <Link to="/admin/missions/create" className="primary-button">
          Create mission <span>+</span>
        </Link>
      </section>
      <section className="stats-grid">
        <article>
          <span>Active students</span>
          <strong>{stats.status === 'loaded' ? stats.activeStudents : stats.status === 'error' ? '—' : '…'}</strong>
          <small className={stats.status === 'error' ? 'attention' : undefined}>
            {stats.status === 'error' ? 'Could not load right now' : 'Live count from Firestore'}
          </small>
        </article>
        <article>
          <span>Active missions</span>
          <strong>0</strong>
          <small>No missions created yet</small>
        </article>
        <article>
          <span>Awaiting review</span>
          <strong>0</strong>
          <small>No submissions yet</small>
        </article>
      </section>
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">REVIEW QUEUE</span>
            <h2>Recent submissions</h2>
          </div>
          <Link to="/admin/submissions">Open review queue →</Link>
        </div>
        {/* No submission repository exists yet (M5) — genuinely empty,
            not a loading placeholder for hidden fake data. */}
        <EmptyState title="No submissions yet." description="Nothing to review right now." />
      </section>
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">ACTIVITY FEED</span>
            <h2>Recent activity</h2>
          </div>
        </div>
        {/* activityLogs collection has no writer yet — nothing generates
            events until M4/M5/M6 exist. Genuinely empty. */}
        <EmptyState
          title="No recent activity."
          description="Platform activity will appear here as it happens."
        />
      </section>
    </>
  );
}