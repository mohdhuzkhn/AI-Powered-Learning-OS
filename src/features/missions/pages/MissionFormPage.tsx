import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../hooks/useAuth';
import { MissionError, MissionService } from '../services/MissionService';
import {
  missionFormSchema,
  type MissionFormInput,
  type MissionFormValues,
} from '../validators/mission.validator';
import { MISSION_CATEGORIES } from '../types/mission.types';

function toDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const TODAY = toDateInputValue(new Date());

export function MissionFormPage() {
  const { missionId } = useParams<{ missionId: string }>();
  const isEditMode = Boolean(missionId);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [isLoadingMission, setIsLoadingMission] = useState(isEditMode);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MissionFormInput, unknown, MissionFormValues>({
    resolver: zodResolver(missionFormSchema),
    defaultValues: { status: 'draft' },
  });

  useEffect(() => {
    if (!isEditMode || !missionId) return;
    let cancelled = false;

    MissionService.getMission(missionId)
      .then((mission) => {
        if (cancelled) return;
        if (!mission) {
          setLoadError('Mission not found.');
          return;
        }
        reset({
          title: mission.title,
          description: mission.description,
          category: mission.category,
          difficulty: mission.difficulty,
          deadline: toDateInputValue(mission.deadline),
          // Archived missions never reach this form (MissionService
          // rejects the edit before this page could load one), but
          // narrowing defensively rather than assuming.
          status: mission.status === 'archived' ? 'published' : mission.status,
        });
      })
      .catch((error: unknown) => {
        console.error('Failed to load mission:', error);
        if (!cancelled) setLoadError('Failed to load mission.');
      })
      .finally(() => {
        if (!cancelled) setIsLoadingMission(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isEditMode, missionId, reset]);

  const onSubmit: SubmitHandler<MissionFormValues> = async (values) => {
    if (!user) return;
    setSubmitError(null);

    try {
      if (isEditMode && missionId) {
        await MissionService.updateMission(user, missionId, values);
      } else {
        await MissionService.createMission(user, values);
      }
      navigate('/admin/missions');
    } catch (error) {
      setSubmitError(
        error instanceof MissionError ? error.message : 'Unable to save mission. Please try again.',
      );
    }
  };

  if (isEditMode && isLoadingMission) {
    return <div className="page-loader">Loading mission…</div>;
  }

  if (loadError) {
    return (
      <div className="auth-error" role="alert">
        {loadError}
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1>{isEditMode ? 'Edit mission' : 'Create mission'}</h1>
          <p>{isEditMode ? 'Update mission details.' : 'Define a new learning mission.'}</p>
        </div>
      </div>

      {submitError && (
        <div className="auth-error" role="alert">
          {submitError}
        </div>
      )}

      <form className="mission-form" onSubmit={(event) => void handleSubmit(onSubmit)(event)} noValidate>
        <label className="form-field">
          <span>Title</span>
          <input type="text" {...register('title')} />
          {errors.title && <small className="form-field-error">{errors.title.message}</small>}
        </label>

        <label className="form-field">
          <span>Description</span>
          <textarea rows={6} {...register('description')} />
          {errors.description && (
            <small className="form-field-error">{errors.description.message}</small>
          )}
        </label>

        <div className="form-row">
          <label className="form-field">
            <span>Category</span>
            <select defaultValue="" {...register('category')}>
              <option value="" disabled>
                Select a category
              </option>
              {MISSION_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <small className="form-field-error">{errors.category.message}</small>}
          </label>

          <label className="form-field">
            <span>Difficulty</span>
            <select defaultValue="" {...register('difficulty')}>
              <option value="" disabled>
                Select a difficulty
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.difficulty && (
              <small className="form-field-error">{errors.difficulty.message}</small>
            )}
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            <span>Deadline</span>
            <input type="date" min={TODAY} {...register('deadline')} />
            {errors.deadline && <small className="form-field-error">{errors.deadline.message}</small>}
          </label>

          <label className="form-field">
            <span>Status</span>
            <select {...register('status')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={() => navigate('/admin/missions')}>
            Cancel
          </button>
          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : isEditMode ? 'Save changes' : 'Create mission'}
          </button>
        </div>
      </form>
    </>
  );
}