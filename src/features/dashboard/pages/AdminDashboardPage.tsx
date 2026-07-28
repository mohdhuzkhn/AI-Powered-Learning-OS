export function AdminDashboardPage() {
  return (
    <>
      <section className="welcome">
        <div>
          <span className="eyebrow">ADMIN OVERVIEW</span>
          <h1>Your learning community is growing.</h1>
          <p>Here’s what needs your attention today.</p>
        </div>
        <button className="primary-button">
          Create mission <span>+</span>
        </button>
      </section>
      <section className="stats-grid">
        <article>
          <span>Active students</span>
          <strong>48</strong>
          <small className="positive">↑ 8% this month</small>
        </article>
        <article>
          <span>Active missions</span>
          <strong>16</strong>
          <small>Across 4 learning tracks</small>
        </article>
        <article>
          <span>Awaiting review</span>
          <strong>9</strong>
          <small className="attention">Needs your attention</small>
        </article>
      </section>
      <section className="content-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">REVIEW QUEUE</span>
            <h2>Recent submissions</h2>
          </div>
          <a href="#submissions">Open review queue →</a>
        </div>
        <div className="review-list">
          {[
            'Ayesha Rahman — Responsive portfolio',
            'Daniel Kim — JavaScript array methods',
            'Nadia Ali — Build a REST API',
          ].map((item, index) => (
            <article key={item}>
              <div className="avatar">{item[0]}</div>
              <div>
                <strong>{item}</strong>
                <span>
                  Submitted {index + 1} hour{index ? 's' : ''} ago
                </span>
              </div>
              <button>Review</button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
