import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { formatDashboardDate, getTimeBasedGreeting } from '../../../utils/greeting';
import { DashboardService } from '../services/DashboardService';

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
        <button className="primary-button">
          Create mission <span>+</span>
        </button>
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
          <a href="#submissions">Open review queue →</a>
        </div>
        <div className="review-list">
          {[
            'Ayesha Rahman — Responsive portfolio',
            'Daniel Kim — JavaScript array methods',
            'Nadia Ali — Build a REST API',
          ].map((item, index) => (
            <article key={item}>
              <div className="avatar">{item[0]}</div>
              <div>
                <strong>{item}</strong>
                <span>
                  Submitted {index + 1} hour{index ? 's' : ''} ago
                </span>
              </div>
              <button>Review</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}