import { AuthService } from '../../authentication/services/AuthService';

export interface AdminDashboardStats {
  activeStudents: number;
}

/**
 * The Dashboard never owns business data (docs/03-Features/02-Dashboard.md
 * "The Dashboard itself owns no business data. It composes data from
 * independent modules."). This service's only job is to call into other
 * features' public services and assemble the result for widgets — it
 * never talks to Firestore or any repository directly.
 */
export const DashboardService = {
  async getAdminStats(): Promise<AdminDashboardStats> {
    const activeStudents = await AuthService.countActiveUsersByRole('student');
    return { activeStudents };
  },
};
