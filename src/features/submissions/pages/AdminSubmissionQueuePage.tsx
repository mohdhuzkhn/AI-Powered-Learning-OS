import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { EmptyState } from '../../../shared/components/EmptyState';
import { AuthService } from '../../authentication/services/AuthService';
import { MissionService } from '../../missions/services/MissionService';
import { SubmissionService } from '../services/SubmissionService';
import type { Submission } from '../types/submission.types';

interface QueueRow {
  submission: Submission;
  studentName: string;
  missionTitle: string;
}

type QueueState =
  | { status: 'loading' }
  | { status: 'loaded'; rows: QueueRow[] }
  | { status: 'error'; message: string };

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function AdminSubmissionQueuePage() {
  const { user } = useAuth();
  const [state, setState] = useState<QueueState>({ status: 'loading' });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    SubmissionService.listPendingReview(user)
      .then(async (submissions) => {
        const rows = await Promise.all(
          submissions.map(async (submission) => {
            const [student, mission] = await Promise.all([
              AuthService.getUserProfile(submission.studentId),
              MissionService.getMission(submission.missionId),
            ]);
            return {
              submission,
              studentName: student?.fullName ?? 'Unknown student',
              missionTitle: mission?.title ?? 'Unknown mission',
            };
          }),
        );
        if (!cancelled) setState({ status: 'loaded', rows });
      })
      .catch((error: unknown) => {
        console.error('Failed to load review queue:', error);
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
          <h1>Review queue</h1>
          <p>Submissions waiting for your decision.</p>
        </div>
      </div>

      {state.status === 'loading' && <div className="page-loader">Loading submissions…</div>}

      {state.status === 'error' && (
        <div className="auth-error" role="alert">
          {state.message}
        </div>
      )}

      {state.status === 'loaded' && state.rows.length === 0 && (
        <EmptyState title="No submissions yet." description="Nothing to review right now." />
      )}

      {state.status === 'loaded' && state.rows.length > 0 && (
        <div className="review-queue-list">
          {state.rows.map(({ submission, studentName, missionTitle }) => (
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
    </>
  );
}
