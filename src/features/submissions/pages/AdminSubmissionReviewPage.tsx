import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../hooks/useAuth';
import { AuthService } from '../../authentication/services/AuthService';
import { MissionService } from '../../missions/services/MissionService';
import type { Mission } from '../../missions/types/mission.types';
import type { AppUser } from '../../../types/user.types';
import { SubmissionError, SubmissionService } from '../services/SubmissionService';
import { reviewFeedbackSchema, type ReviewFeedbackValues } from '../validators/submission.validator';
import type { Submission, SubmissionStatus } from '../types/submission.types';

type PageState =
  | { status: 'loading' }
  | { status: 'loaded'; submission: Submission; student: AppUser | null; mission: Mission | null }
  | { status: 'not-found' }
  | { status: 'error'; message: string };

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  submitted: 'Submitted — awaiting review',
  approved: 'Approved',
  rejected: 'Rejected',
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function AdminSubmissionReviewPage() {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { user } = useAuth();
  const [state, setState] = useState<PageState>({ status: 'loading' });
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFeedbackValues>({
    resolver: zodResolver(reviewFeedbackSchema),
    defaultValues: { feedback: '' },
  });

  useEffect(() => {
    if (!user || !assignmentId) return;
    let cancelled = false;

    SubmissionService.getSubmissionForReview(user, assignmentId)
      .then(async (submission) => {
        if (!submission) {
          if (!cancelled) setState({ status: 'not-found' });
          return;
        }
        const [student, mission] = await Promise.all([
          AuthService.getUserProfile(submission.studentId),
          MissionService.getMission(submission.missionId),
        ]);
        if (!cancelled) setState({ status: 'loaded', submission, student, mission });
      })
      .catch((error: unknown) => {
        console.error('Failed to load submission:', error);
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to load submission.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user, assignmentId]);

  const onDecide = async (decision: 'approved' | 'rejected', values: ReviewFeedbackValues) => {
    if (!user || !assignmentId || state.status !== 'loaded') return;
    setIsReviewing(true);
    setReviewError(null);

    try {
      const submission = await SubmissionService.reviewSubmission(user, assignmentId, {
        decision,
        feedback: values.feedback,
      });
      setState({ ...state, submission });
    } catch (error) {
      setReviewError(
        error instanceof SubmissionError ? error.message : 'Unable to submit review. Please try again.',
      );
    } finally {
      setIsReviewing(false);
    }
  };

  if (state.status === 'loading') {
    return <div className="page-loader">Loading submission…</div>;
  }

  if (state.status === 'not-found') {
    return (
      <div className="auth-error" role="alert">
        Submission not found.
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="auth-error" role="alert">
        {state.message}
      </div>
    );
  }

  const { submission, student, mission } = state;
  // BR-SUB-005: approved submissions are immutable — no further review action.
  const canReview = submission.status !== 'approved';

  return (
    <>
      <div className="page-header">
        <div>
          <span className={`status-badge status-submission-${submission.status}`}>
            {STATUS_LABELS[submission.status]}
          </span>
          <h1>{mission?.title ?? 'Unknown mission'}</h1>
          <p>
            {student?.fullName ?? 'Unknown student'} · Submitted {formatDate(submission.submittedAt)}
          </p>
        </div>
      </div>

      {reviewError && (
        <div className="auth-error" role="alert">
          {reviewError}
        </div>
      )}

      <div className="mission-details-card">
        <h2>Description</h2>
        <p>{submission.description}</p>
      </div>

      <div className="mission-details-card">
        <h2>Screenshot</h2>
        <a href={submission.screenshotUrl} target="_blank" rel="noreferrer" className="auth-forgot-link">
          View screenshot ↗
        </a>
      </div>

      {submission.feedback && (
        <div className="mission-details-card">
          <h2>Feedback given</h2>
          <p>{submission.feedback}</p>
        </div>
      )}

      {canReview && (
        <div className="mission-details-card">
          <h2>Review</h2>
          <form className="mission-form" noValidate>
            <label className="form-field">
              <span>Feedback (optional)</span>
              <textarea rows={4} disabled={isReviewing} {...register('feedback')} />
              {errors.feedback && <small className="form-field-error">{errors.feedback.message}</small>}
            </label>
            <div className="form-actions">
              <button
                type="button"
                className="danger-button"
                disabled={isReviewing}
                onClick={() => void handleSubmit((values) => onDecide('rejected', values))()}
              >
                {isReviewing ? 'Saving…' : 'Reject'}
              </button>
              <button
                type="button"
                className="primary-button"
                disabled={isReviewing}
                onClick={() => void handleSubmit((values) => onDecide('approved', values))()}
              >
                {isReviewing ? 'Saving…' : 'Approve'}
              </button>
            </div>
          </form>
        </div>
      )}

      <Link to="/admin/submissions" className="auth-back-link">
        ← Back to review queue
      </Link>
    </>
  );
}
