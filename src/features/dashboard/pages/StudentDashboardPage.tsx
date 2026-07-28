const missions = [
  {
    title: 'Build a responsive portfolio',
    track: 'Frontend Development',
    due: 'Due in 2 days',
    status: 'In progress',
    progress: 65,
    color: 'violet',
  },
  {
    title: 'JavaScript array methods',
    track: 'JavaScript Fundamentals',
    due: 'Due Jul 22',
    status: 'Not started',
    progress: 0,
    color: 'orange',
  },
  {
    title: 'Design a REST API',
    track: 'Backend Development',
    due: 'Due Jul 26',
    status: 'In progress',
    progress: 30,
    color: 'blue',
  },
];

export function StudentDashboardPage() {
  return (
    <>
      <section className="welcome">
        <div>
          <span className="eyebrow">THURSDAY, JULY 16</span>
          <h1>
            Good morning, Ayesha <span>✦</span>
          </h1>
          <p>Small progress every day adds up to big results. You have 3 active missions.</p>
        </div>
        <button className="primary-button">
          View learning path <span>→</span>
        </button>
      </section>
      <section className="stats-grid">
        <article>
          <span>Active missions</span>
          <strong>3</strong>
          <small className="positive">↑ 1 from last week</small>
        </article>
        <article>
          <span>Completed</span>
          <strong>12</strong>
          <small>of 18 total missions</small>
        </article>
        <article>
          <span>Learning streak</span>
          <strong>
            7 <em>days</em>
          </strong>
          <small>Keep it going! 🔥</small>
        </article>
      </section>
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">KEEP MOVING</span>
            <h2>Your active missions</h2>
          </div>
          <a href="#missions">View all missions →</a>
        </div>
        <div className="mission-grid">
          {missions.map((mission) => (
            <article className="mission-card" key={mission.title}>
              <div className={`mission-icon ${mission.color}`}>⌘</div>
              <div className="mission-meta">
                <span>{mission.track}</span>
                <b>{mission.status}</b>
              </div>
              <h3>{mission.title}</h3>
              <div className="progress">
                <span style={{ width: `${mission.progress}%` }} />
              </div>
              <footer>
                <span>{mission.due}</span>
                <span>{mission.progress}% complete</span>
              </footer>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
