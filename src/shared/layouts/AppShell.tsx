import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
export function AppShell() {
  const { user, signOut } = useAuth();

  const navigation = [
    {
      label: 'Overview',
      icon: '⌂',
      to: user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard',
    },
    {
      label: 'Missions',
      icon: '◈',
      to: user?.role === 'admin' ? '/admin/missions' : '/student/missions',
    },
    { label: 'Submissions', icon: '↗', to: '/submissions' },
    { label: 'Resources', icon: '▤', to: '/resources' },
  ];

  const handleSignOut = () => {
    signOut().catch((error: unknown) => {
      console.error('Failed to sign out', error);
    });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">L</span>
          <span>Learning OS</span>
        </div>
        <nav>
          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">{user?.fullName[0]}</div>
            <div>
              <strong>{user?.fullName}</strong>
              <small>{user?.role}</small>
            </div>
          </div>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </aside>
      <section className="main-area">
        <header className="topbar">
          <span className="breadcrumb">
            Workspace / {user?.role === 'admin' ? 'Admin' : 'Student'}
          </span>
          <button className="notification" aria-label="Notifications">
            ◔
          </button>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
