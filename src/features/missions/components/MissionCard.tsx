import { Link } from 'react-router-dom';
import type { Mission } from '../types/mission.types';

const STATUS_LABELS: Record<Mission['status'], string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

function formatDeadline(deadline: Date): string {
  return deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function MissionCard({ mission, to }: { mission: Mission; to: string }) {
  return (
    <Link to={to} className="mission-list-card">
      <div className="mission-list-card-header">
        <span className={`status-badge status-${mission.status}`}>{STATUS_LABELS[mission.status]}</span>
        <span className="mission-difficulty">{mission.difficulty}</span>
      </div>
      <h3>{mission.title}</h3>
      <p>{mission.description}</p>
      <footer>
        <span>{mission.category}</span>
        <span>Due {formatDeadline(mission.deadline)}</span>
      </footer>
    </Link>
  );
}