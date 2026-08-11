import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { EmptyState } from '../../../shared/components/EmptyState';
import { MissionService } from '../../missions/services/MissionService';
import { SubmissionService } from '../services/SubmissionService';
import type { Submission, SubmissionStatus } from '../types/submission.types';

interface HistoryRow {
  submission: Submission;
  missionTitle: string;
}

type ListState =
  | { status: 'loading' }
  | { status: 'loaded'; rows: HistoryRow[] }
  | { status: 'error'; message: string };

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  submitted: 'Submitted — awaiting review',
  approved: 'Approved',
  rejected: 'Rejected',
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function StudentSubmissionListPage() {
  const { user } = useAuth();
  const [state, setState] = useState<ListState>({ status: 'loading' });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    SubmissionService.listMySubmissions(user)
      .then(async (submissions) => {
        const rows = await Promise.all(
          submissions.map(async (submission) => {
            const mission = await MissionService.getMission(submission.missionId);
            return { submission, missionTitle: mission?.title ?? 'Unknown mission' };
          }),
        );
        if (!cancelled) setState({ status: 'loaded', rows });
      })
      .catch((error: unknown) => {
        console.error('Failed to load submission history:', error);
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to load submissions.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>My submissions</h1>
          <p>Your submission history and review status.</p>
        </div>
      </div>

      {state.status === 'loading' && <div className="page-loader">Loading submissions…</div>}

      {state.status === 'error' && (
        <div className="auth-error" role="alert">
          {state.message}
        </div>
      )}

      {state.status === 'loaded' && state.rows.length === 0 && (
        <EmptyState
          title="No submissions yet."
          description="Submit work on an assigned mission to see it here."
        />
      )}

      {state.status === 'loaded' && state.rows.length > 0 && (
        <div className="review-queue-list">
          {state.rows.map(({ submission, missionTitle }) => (
            <Link
              key={submission.id}
              to={`/student/missions/${submission.missionId}`}
              className="review-queue-row"
            >
              <div>
                <strong>{missionTitle}</strong>
                <span>Submitted {formatDate(submission.submittedAt)}</span>
              </div>
              <span className={`status-badge status-submission-${submission.status}`}>
                {STATUS_LABELS[submission.status]}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
