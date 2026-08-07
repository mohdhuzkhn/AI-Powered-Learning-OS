import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { EmptyState } from '../../../shared/components/EmptyState';
import { MissionService } from '../services/MissionService';
import type { Mission } from '../types/mission.types';
import { MissionCard } from '../components/MissionCard';

type ListState =
  | { status: 'loading' }
  | { status: 'loaded'; missions: Mission[] }
  | { status: 'error'; message: string };

export function StudentMissionListPage() {
  const { user } = useAuth();
  const [state, setState] = useState<ListState>({ status: 'loading' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    MissionService.listMyAssignedMissions(user)
      .then((missions) => {
        if (!cancelled) setState({ status: 'loaded', missions });
      })
      .catch((error: unknown) => {
        console.error('Failed to load missions:', error);
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to load missions.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const filteredMissions = useMemo(() => {
    if (state.status !== 'loaded') return [];
    const term = search.trim().toLowerCase();
    if (term.length === 0) return state.missions;
    return state.missions.filter(
      (mission) =>
        mission.title.toLowerCase().includes(term) || mission.category.toLowerCase().includes(term),
    );
  }, [state, search]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>My missions</h1>
          <p>Missions assigned to you.</p>
        </div>
      </div>

      <div className="mission-list-toolbar">
        <input
          type="search"
          placeholder="Search by title or category…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {state.status === 'loading' && <div className="page-loader">Loading missions…</div>}

      {state.status === 'error' && (
        <div className="auth-error" role="alert">
          {state.message}
        </div>
      )}

      {state.status === 'loaded' && filteredMissions.length === 0 && (
        <EmptyState
          title="No missions assigned."
          description={state.missions.length === 0 ? 'Enjoy your free time!' : 'Try a different search.'}
        />
      )}

      {state.status === 'loaded' && filteredMissions.length > 0 && (
        <div className="mission-list-grid">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} to={`/student/missions/${mission.id}`} />
          ))}
        </div>
      )}
    </>
  );
}
