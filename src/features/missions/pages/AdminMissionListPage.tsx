import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { EmptyState } from '../../../shared/components/EmptyState';
import { MissionService } from '../services/MissionService';
import type { Mission, MissionStatus } from '../types/mission.types';
import { MissionCard } from '../components/MissionCard';

type ListState =
  | { status: 'loading' }
  | { status: 'loaded'; missions: Mission[] }
  | { status: 'error'; message: string };

const STATUS_FILTERS: Array<{ label: string; value: MissionStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

export function AdminMissionListPage() {
  const { user } = useAuth();
  const [state, setState] = useState<ListState>({ status: 'loading' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MissionStatus | 'all'>('all');

  useEffect(() => {
    // AdminRoute already guarantees an admin user by the time this
    // renders — this guard is for TypeScript's benefit, not a real
    // runtime possibility.
    if (!user) return;
    let cancelled = false;

    MissionService.listAllMissions(user)
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

    return state.missions.filter((mission) => {
      const matchesStatus = statusFilter === 'all' || mission.status === statusFilter;
      const matchesSearch =
        term.length === 0 ||
        mission.title.toLowerCase().includes(term) ||
        mission.category.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [state, search, statusFilter]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Missions</h1>
          <p>Create and manage learning missions.</p>
        </div>
        <Link to="/admin/missions/create" className="primary-button">
          Create mission <span>+</span>
        </Link>
      </div>

      <div className="mission-list-toolbar">
        <input
          type="search"
          placeholder="Search by title or category…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="status-filter-tabs">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={statusFilter === filter.value ? 'selected' : ''}
              onClick={() => setStatusFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {state.status === 'loading' && <div className="page-loader">Loading missions…</div>}

      {state.status === 'error' && (
        <div className="auth-error" role="alert">
          {state.message}
        </div>
      )}

      {state.status === 'loaded' && filteredMissions.length === 0 && (
        <EmptyState
          title="No missions found."
          description={
            state.missions.length === 0
              ? 'Create your first mission to get started.'
              : 'Try a different search or filter.'
          }
        />
      )}

      {state.status === 'loaded' && filteredMissions.length > 0 && (
        <div className="mission-list-grid">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </>
  );
}
