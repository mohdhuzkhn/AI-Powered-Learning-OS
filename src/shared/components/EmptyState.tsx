interface EmptyStateProps {
  title: string;
  description: string;
}

/**
 * Matches the documented Empty States pattern in
 * docs/03-Features/02-Dashboard.md — used by widgets whose underlying
 * collection genuinely has no data yet (e.g. missions/submissions before
 * M4/M5 exist), rather than showing fabricated placeholder content.
 */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-description">{description}</p>
    </div>
  );
}
