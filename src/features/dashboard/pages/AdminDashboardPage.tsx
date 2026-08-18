import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { formatDashboardDate, getTimeBasedGreeting } from '../../../utils/greeting';
import { EmptyState } from '../../../shared/components/EmptyState';
import {
  DashboardService,
  type AdminDashboardStats,
  type AdminReviewPreviewRow,
} from '../services/DashboardService';

type StatsState =
  | { status: 'loading' }
  | { status: 'loaded'; stats: AdminDashboardStats }
  | { status: 'error' };

type PreviewState =
  | { status: 'loading' }
  | { status: 'loaded'; rows: AdminReviewPreviewRow[] }
  | { status: 'error' };

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsState>({ status: 'loading' });
  const [preview, setPreview] = useState<PreviewState>({ status: 'loading' });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    DashboardService.getAdminStats(user)
      .then((result) => {
        if (!cancelled) setStats({ status: 'loaded', stats: result });
      })
      .catch((error: unknown) => {
        // Isolated widget failure — per docs/03-Features/02-Dashboard.md
        // "A broken widget must never crash the dashboard." Logged so a
        // rules/config problem is diagnosable, not silently swallowed.
        console.error('Failed to load admin dashboard stats:', error);
        if (!cancelled) setStats({ status: 'error' });
      });

    DashboardService.getRecentSubmissionsPreview(user)
      .then((rows) => {
        if (!cancelled) setPreview({ status: 'loaded', rows });
      })
      .catch((error: unknown) => {
        console.error('Failed to load recent submissions:', error);
        if (!cancelled) setPreview({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

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
          <strong>
            {stats.status === 'loaded' ? stats.stats.activeStudents : stats.status === 'error' ? '—' : '…'}
          </strong>
          <small className={stats.status === 'error' ? 'attention' : undefined}>
            {stats.status === 'error' ? 'Could not load right now' : 'Live count from Firestore'}
          </small>
        </article>
        <article>
          <span>Active missions</span>
          <strong>
            {stats.status === 'loaded' ? stats.stats.activeMissions : stats.status === 'error' ? '—' : '…'}
          </strong>
          <small>{stats.status === 'loaded' ? 'Currently published' : ''}</small>
        </article>
        <article>
          <span>Awaiting review</span>
          <strong>
            {stats.status === 'loaded' ? stats.stats.awaitingReview : stats.status === 'error' ? '—' : '…'}
          </strong>
          <small
            className={
              stats.status === 'loaded' && stats.stats.awaitingReview > 0 ? 'attention' : undefined
            }
          >
            {stats.status === 'loaded'
              ? stats.stats.awaitingReview > 0
                ? 'Needs your attention'
                : 'All caught up'
              : ''}
          </small>
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

        {preview.status === 'loading' && <div className="page-loader">Loading submissions…</div>}

        {preview.status === 'error' && (
          <div className="auth-error" role="alert">
            Could not load recent submissions right now.
          </div>
        )}

        {preview.status === 'loaded' && preview.rows.length === 0 && (
          <EmptyState title="No submissions yet." description="Nothing to review right now." />
        )}

        {preview.status === 'loaded' && preview.rows.length > 0 && (
          <div className="review-queue-list">
            {preview.rows.map(({ submission, studentName, missionTitle }) => (
              <Link
                key={submission.id}
                to={`/admin/submissions/${submission.assignmentId}`}
                className="review-queue-row"
              >
                <div className="avatar">{studentName[0]}</div>
                <div>
                  <strong>{studentName}</strong>
                  <span>{missionTitle}</span>
                </div>
                <span className="review-queue-date">Submitted {formatDate(submission.submittedAt)}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">ACTIVITY FEED</span>
            <h2>Recent activity</h2>
          </div>
        </div>
        {/* activityLogs collection has no writer yet — nothing generates
            events until a later feature writes to it. Genuinely empty. */}
        <EmptyState
          title="No recent activity."
          description="Platform activity will appear here as it happens."
        />
      </section>
    </>
  );
}
