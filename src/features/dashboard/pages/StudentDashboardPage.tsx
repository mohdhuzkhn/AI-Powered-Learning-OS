import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { formatDashboardDate, getTimeBasedGreeting } from '../../../utils/greeting';
import { EmptyState } from '../../../shared/components/EmptyState';
import { MissionCard } from '../../missions/components/MissionCard';
import { MissionService } from '../../missions/services/MissionService';
import type { Mission } from '../../missions/types/mission.types';
import { SubmissionService } from '../../submissions/services/SubmissionService';

const PREVIEW_LIMIT = 3;

type MissionsState =
  | { status: 'loading' }
  | { status: 'loaded'; missions: Mission[] }
  | { status: 'error' };

type CompletedState = { status: 'loading' } | { status: 'loaded'; count: number } | { status: 'error' };

export function StudentDashboardPage() {
  const { user } = useAuth();
  const [missionsState, setMissionsState] = useState<MissionsState>({ status: 'loading' });
  const [completedState, setCompletedState] = useState<CompletedState>({ status: 'loading' });

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    MissionService.listMyAssignedMissions(user)
      .then((missions) => {
        if (!cancelled) setMissionsState({ status: 'loaded', missions });
      })
      .catch((error: unknown) => {
        console.error('Failed to load assigned missions:', error);
        if (!cancelled) setMissionsState({ status: 'error' });
      });

    SubmissionService.listMySubmissions(user)
      .then((submissions) => {
        const count = submissions.filter((submission) => submission.status === 'approved').length;
        if (!cancelled) setCompletedState({ status: 'loaded', count });
      })
      .catch((error: unknown) => {
        console.error('Failed to load submission history:', error);
        if (!cancelled) setCompletedState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const activeMissionsCount = missionsState.status === 'loaded' ? missionsState.missions.length : null;

  return (
    <>
      <section className="welcome">
        <div>
          <span className="eyebrow">{formatDashboardDate()}</span>
          <h1>
            {getTimeBasedGreeting()}, {user?.fullName} <span>✦</span>
          </h1>
          <p>Small progress every day adds up to big results.</p>
        </div>
        <Link to="/student/missions" className="primary-button">
          View learning path <span>→</span>
        </Link>
      </section>
      <section className="stats-grid">
        <article>
          <span>Active missions</span>
          <strong>{activeMissionsCount === null ? '…' : activeMissionsCount}</strong>
          <small>
            {missionsState.status === 'error'
              ? 'Could not load right now'
              : activeMissionsCount === 0
                ? 'No missions assigned yet'
                : 'Assigned to you now'}
          </small>
        </article>
        <article>
          <span>Completed</span>
          <strong>
            {completedState.status === 'loaded' ? completedState.count : completedState.status === 'error' ? '—' : '…'}
          </strong>
          <small>
            {completedState.status === 'error'
              ? 'Could not load right now'
              : completedState.status === 'loaded' && completedState.count > 0
                ? 'Approved missions'
                : 'No missions completed yet'}
          </small>
        </article>
        <article>
          <span>Learning streak</span>
          <strong>
            0 <em>days</em>
          </strong>
          <small>Complete a mission to start your streak</small>
        </article>
      </section>
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">KEEP MOVING</span>
            <h2>Your active missions</h2>
          </div>
          <Link to="/student/missions">View all missions →</Link>
        </div>

        {missionsState.status === 'loading' && <div className="page-loader">Loading missions…</div>}

        {missionsState.status === 'error' && (
          <div className="auth-error" role="alert">
            Could not load your missions right now.
          </div>
        )}

        {missionsState.status === 'loaded' && missionsState.missions.length === 0 && (
          <EmptyState title="No missions assigned." description="Enjoy your free time!" />
        )}

        {missionsState.status === 'loaded' && missionsState.missions.length > 0 && (
          <div className="mission-list-grid">
            {missionsState.missions.slice(0, PREVIEW_LIMIT).map((mission) => (
              <MissionCard key={mission.id} mission={mission} to={`/student/missions/${mission.id}`} />
            ))}
          </div>
        )}
      </section>
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">STAY INFORMED</span>
            <h2>Announcements</h2>
          </div>
        </div>
        {/* No announcement repository exists yet (M6) — genuinely empty. */}
        <EmptyState
          title="No announcements yet."
          description="Check back soon for updates from your instructors."
        />
      </section>
    </>
  );
}