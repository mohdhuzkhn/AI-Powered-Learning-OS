import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { MissionError, MissionService } from '../services/MissionService';
import type { Mission } from '../types/mission.types';

type DetailsState =
  | { status: 'loading' }
  | { status: 'loaded'; mission: Mission }
  | { status: 'not-found' }
  | { status: 'error'; message: string };

const STATUS_LABELS: Record<Mission['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function AdminMissionDetailsPage() {
  const { missionId } = useParams<{ missionId: string }>();
  const { user } = useAuth();
  const [state, setState] = useState<DetailsState>({ status: 'loading' });
  const [isArchiving, setIsArchiving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!missionId) return;
    let cancelled = false;

    MissionService.getMission(missionId)
      .then((mission) => {
        if (cancelled) return;
        setState(mission ? { status: 'loaded', mission } : { status: 'not-found' });
      })
      .catch((error: unknown) => {
        console.error('Failed to load mission:', error);
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to load mission.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [missionId]);

  const handleArchive = async () => {
    if (!user || !missionId || state.status !== 'loaded') return;
    const currentMission = state.mission;

    if (!window.confirm('Archive this mission? Archived missions can no longer be edited.')) {
      return;
    }

    setIsArchiving(true);
    setActionError(null);
    try {
      await MissionService.archiveMission(user, missionId);
      setState({ status: 'loaded', mission: { ...currentMission, status: 'archived' } });
    } catch (error) {
      setActionError(
        error instanceof MissionError ? error.message : 'Unable to archive mission. Please try again.',
      );
    } finally {
      setIsArchiving(false);
    }
  };

  if (state.status === 'loading') {
    return <div className="page-loader">Loading mission…</div>;
  }

  if (state.status === 'not-found') {
    return (
      <div className="auth-error" role="alert">
        Mission not found.
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

  const { mission } = state;

  return (
    <>
      <div className="page-header">
        <div>
          <span className={`status-badge status-${mission.status}`}>{STATUS_LABELS[mission.status]}</span>
          <h1>{mission.title}</h1>
          <p>
            {mission.category} · {mission.difficulty} · Due {formatDate(mission.deadline)}
          </p>
        </div>
        {mission.status !== 'archived' && (
          <div className="page-header-actions">
            <Link to={`/admin/missions/${mission.id}/edit`} className="secondary-button">
              Edit
            </Link>
            <button
              type="button"
              className="danger-button"
              onClick={() => void handleArchive()}
              disabled={isArchiving}
            >
              {isArchiving ? 'Archiving…' : 'Archive'}
            </button>
          </div>
        )}
      </div>

      {actionError && (
        <div className="auth-error" role="alert">
          {actionError}
        </div>
      )}

      <div className="mission-details-card">
        <h2>Description</h2>
        <p>{mission.description}</p>
      </div>

      <Link to="/admin/missions" className="auth-back-link">
        ← Back to missions
      </Link>
    </>
  );
}