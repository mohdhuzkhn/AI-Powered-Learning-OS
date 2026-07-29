/**
 * Time-of-day greeting for dashboard welcome widgets.
 * Accepts a Date for testability — defaults to "now".
 */
export function getTimeBasedGreeting(date: Date = new Date()): string {
    const hour = date.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
  
  /**
   * Formats a date for the dashboard's eyebrow label, e.g. "THURSDAY, JULY 16".
   */
  export function formatDashboardDate(date: Date = new Date()): string {
    return date
      .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      .toUpperCase();
  }