import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../hooks/useAuth';
import type { Mission } from '../../missions/types/mission.types';
import { ScreenshotStorage } from '../services/ScreenshotStorage';
import { SubmissionError, SubmissionService } from '../services/SubmissionService';
import {
  submissionFormSchema,
  type SubmissionFormInput,
  type SubmissionFormValues,
} from '../validators/submission.validator';
import type { Submission } from '../types/submission.types';

type PanelState =
  | { status: 'loading' }
  | { status: 'ready'; submission: Submission | null }
  | { status: 'error'; message: string };

const STATUS_LABELS: Record<Submission['status'], string> = {
  submitted: 'Submitted — awaiting review',
  approved: 'Approved',
  rejected: 'Rejected',
};

export function SubmissionPanel({ mission, assignmentId }: { mission: Mission; assignmentId: string }) {
  const { user } = useAuth();
  const [state, setState] = useState<PanelState>({ status: 'loading' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormInput, unknown, SubmissionFormValues>({
    resolver: zodResolver(submissionFormSchema),
  });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    SubmissionService.getMySubmission(user, assignmentId)
      .then((submission) => {
        if (!cancelled) setState({ status: 'ready', submission });
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

  const onSubmit: SubmitHandler<SubmissionFormValues> = async (values) => {
    if (!user || state.status !== 'ready') return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const screenshotUrl = await ScreenshotStorage.upload(user.uid, assignmentId, values.screenshot);
      const isResubmit = state.submission?.status === 'rejected';

      const submission = isResubmit
        ? await SubmissionService.resubmitMission(user, assignmentId, {
            description: values.description,
            screenshotUrl,
          })
        : await SubmissionService.submitMission(user, {
            assignmentId,
            missionId: mission.id,
            description: values.description,
            screenshotUrl,
          });

      setState({ status: 'ready', submission });
      setShowForm(false);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof SubmissionError ? error.message : 'Unable to submit your work. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.status === 'loading') {
    return (
      <div className="mission-details-card">
        <h2>Submission</h2>
        <p className="assignment-hint">Loading…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="mission-details-card">
        <h2>Submission</h2>
        <div className="auth-error" role="alert">
          {state.message}
        </div>
      </div>
    );
  }

  const { submission } = state;
  // A form is offerable when there's no submission yet, or the existing
  // one was rejected (BR-SUB-006). Submitted/approved submissions never
  // show a form — nothing to edit, matches BR-SUB-005 for approved and
  // "wait for review" for submitted.
  const canSubmit = !submission || submission.status === 'rejected';
  const shouldShowForm = canSubmit && (showForm || !submission);

  return (
    <div className="mission-details-card">
      <h2>Submission</h2>

      {submitError && (
        <div className="auth-error" role="alert">
          {submitError}
        </div>
      )}

      {submission && !shouldShowForm && (
        <div className="submission-status">
          <span className={`status-badge status-submission-${submission.status}`}>
            {STATUS_LABELS[submission.status]}
          </span>
          <p className="submission-description">{submission.description}</p>
          <a
            href={submission.screenshotUrl}
            target="_blank"
            rel="noreferrer"
            className="auth-forgot-link"
          >
            View screenshot ↗
          </a>
          {submission.feedback && (
            <div className="submission-feedback">
              <strong>Feedback</strong>
              <p>{submission.feedback}</p>
            </div>
          )}
          {submission.status === 'rejected' && (
            <button type="button" className="secondary-button" onClick={() => setShowForm(true)}>
              Resubmit
            </button>
          )}
        </div>
      )}

      {shouldShowForm && (
        <form
          className="mission-form"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          noValidate
        >
          <label className="form-field">
            <span>Description</span>
            <textarea rows={5} disabled={isSubmitting} {...register('description')} />
            {errors.description && (
              <small className="form-field-error">{errors.description.message}</small>
            )}
          </label>

          <label className="form-field">
            <span>Screenshot</span>
            <input type="file" accept="image/*" disabled={isSubmitting} {...register('screenshot')} />
            {errors.screenshot && (
              <small className="form-field-error">{errors.screenshot.message}</small>
            )}
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Submit work'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
