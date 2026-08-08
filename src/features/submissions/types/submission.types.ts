/**
 * Matches docs/04-Engineering/02-Database-Design.md's submissions
 * collection schema exactly: submitted / approved / rejected.
 *
 * Submission-System.md's narrative lifecycle also mentions "Under Review"
 * and "Not Started" — those aren't separate persisted states. "Not
 * Started" is simply the absence of a submission document (no admin
 * review action exists to transition into "Under Review" as its own
 * status; an admin looking at a 'submitted' item IS what "under review"
 * means in the UI).
 */
export type SubmissionStatus = 'submitted' | 'approved' | 'rejected';

/**
 * Domain representation of a `submissions/{assignmentId}` document.
 * The document ID equals its assignmentId — see SubmissionRepository for
 * why (one submission per assignment, enforced by construction).
 *
 * `missionId` is a deliberate denormalization beyond Submission-System.md's
 * minimal suggested document — avoids an extra read per row when
 * rendering an admin review queue across many submissions
 * (docs/04-Engineering/02-Database-Design.md explicitly permits
 * denormalizing "only for read optimization").
 */
export interface Submission {
  id: string;
  assignmentId: string;
  missionId: string;
  studentId: string;
  description: string;
  screenshotUrl: string;
  status: SubmissionStatus;
  feedback: string;
  submittedAt: Date;
  reviewedAt: Date | null;
  reviewedBy: string | null;
}

/** Fields required for a student's first submission on an assignment. */
export interface NewSubmissionInput {
  assignmentId: string;
  missionId: string;
  description: string;
  screenshotUrl: string;
}

/** Fields required to resubmit after a rejection. */
export interface ResubmissionInput {
  description: string;
  screenshotUrl: string;
}

/** BR-SUB-007: every review must contain a decision — no "save for later." */
export interface SubmissionReviewInput {
  decision: Extract<SubmissionStatus, 'approved' | 'rejected'>;
  feedback: string;
}
