import { AuthService } from '../../authentication/services/AuthService';
import { MissionService } from '../../missions/services/MissionService';
import { SubmissionService } from '../../submissions/services/SubmissionService';
import type { Submission } from '../../submissions/types/submission.types';
import type { AppUser } from '../../../types/user.types';

export interface AdminDashboardStats {
  activeStudents: number;
  activeMissions: number;
  awaitingReview: number;
}

export interface AdminReviewPreviewRow {
  submission: Submission;
  studentName: string;
  missionTitle: string;
}

/**
 * The Dashboard never owns business data (docs/03-Features/02-Dashboard.md
 * "The Dashboard itself owns no business data. It composes data from
 * independent modules."). This service's only job is to call into other
 * features' public services and assemble the result for widgets — it
 * never talks to Firestore or any repository directly.
 */
export const DashboardService = {
  async getAdminStats(actor: AppUser): Promise<AdminDashboardStats> {
    const [activeStudents, activeMissions, awaitingReview] = await Promise.all([
      AuthService.countActiveUsersByRole('student'),
      MissionService.countPublishedMissions(),
      SubmissionService.countPendingReview(actor),
    ]);
    return { activeStudents, activeMissions, awaitingReview };
  },

  /** A short preview for the "Recent submissions" widget — full detail lives at /admin/submissions. */
  async getRecentSubmissionsPreview(actor: AppUser, limit = 3): Promise<AdminReviewPreviewRow[]> {
    const submissions = await SubmissionService.listPendingReview(actor);
    const preview = submissions.slice(0, limit);

    return Promise.all(
      preview.map(async (submission) => {
        const [student, mission] = await Promise.all([
          AuthService.getUserProfile(submission.studentId),
          MissionService.getMission(submission.missionId),
        ]);
        return {
          submission,
          studentName: student?.fullName ?? 'Unknown student',
          missionTitle: mission?.title ?? 'Unknown mission',
        };
      }),
    );
  },
};
