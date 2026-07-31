import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { formatDashboardDate, getTimeBasedGreeting } from '../../../utils/greeting';
import { EmptyState } from '../../../shared/components/EmptyState';

export function StudentDashboardPage() {
  const { user } = useAuth();

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
          <strong>0</strong>
          <small>No missions assigned yet</small>
        </article>
        <article>
          <span>Completed</span>
          <strong>0</strong>
          <small>No missions completed yet</small>
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
        {/* No mission repository exists yet (M4) — this is a genuinely
            empty state, not a loading placeholder for hidden fake data. */}
        <EmptyState title="No missions assigned." description="Enjoy your free time!" />
      </section>
    </>
  );
}