import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { MissionService } from '../services/MissionService';
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

export function StudentMissionDetailsPage() {
  const { missionId } = useParams<{ missionId: string }>();
  const { user } = useAuth();
  const [state, setState] = useState<DetailsState>({ status: 'loading' });

  useEffect(() => {
    if (!user || !missionId) return;
    let cancelled = false;

    MissionService.getAssignedMissionForStudent(user, missionId)
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
  }, [user, missionId]);

  if (state.status === 'loading') {
    return <div className="page-loader">Loading mission…</div>;
  }

  // Deliberately the same message whether the mission doesn't exist or
  // simply isn't assigned to this student — distinguishing the two would
  // let someone probe for valid mission IDs that aren't theirs.
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
      </div>

      <div className="mission-details-card">
        <h2>Description</h2>
        <p>{mission.description}</p>
      </div>

      <div className="mission-details-card">
        <h2>Submission</h2>
        <p className="assignment-hint">Submitting your work isn&apos;t available yet — coming soon.</p>
      </div>

      <Link to="/student/missions" className="auth-back-link">
        ← Back to missions
      </Link>
    </>
  );
}
