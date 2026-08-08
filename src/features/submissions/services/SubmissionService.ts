import { MissionService } from '../../missions/services/MissionService';
import type { AppUser } from '../../../types/user.types';
import { SubmissionRepository } from '../repositories/SubmissionRepository';
import type {
  NewSubmissionInput,
  ResubmissionInput,
  Submission,
  SubmissionReviewInput,
} from '../types/submission.types';

/**
 * Business-friendly error thrown by every SubmissionService method —
 * same role as AuthError/MissionError elsewhere in this codebase.
 */
export class SubmissionError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'SubmissionError';
    this.code = code;
  }
}

function assertAdmin(actor: AppUser): void {
  if (actor.role !== 'admin') {
    throw new SubmissionError('Only administrators can review submissions.', 'FORBIDDEN');
  }
}

export const SubmissionService = {
  /**
   * First-time submission for an assignment. Enforces BR-SUB-001 (only
   * the actually-assigned student may submit — verified via MissionService,
   * not just trusted from the client) and prevents silently overwriting
   * an existing active submission. A rejected submission must go through
   * resubmitMission instead, not this method again.
   */
  async submitMission(actor: AppUser, input: NewSubmissionInput): Promise<Submission> {
    const assignment = await MissionService.getAssignmentById(input.assignmentId);
    if (!assignment || assignment.studentId !== actor.uid || assignment.missionId !== input.missionId) {
      throw new SubmissionError('This mission is not assigned to you.', 'NOT_ASSIGNED');
    }

    const existing = await SubmissionRepository.findByAssignment(input.assignmentId);
    if (existing) {
      throw new SubmissionError(
        existing.status === 'rejected'
          ? 'This submission was rejected — resubmit instead of submitting again.'
          : 'You already have an active submission for this mission.',
        'ALREADY_SUBMITTED',
      );
    }

    return SubmissionRepository.create(input, actor.uid);
  },

  /** BR-SUB-006: only a rejected submission may be resubmitted, and only by its owner. */
  async resubmitMission(
    actor: AppUser,
    assignmentId: string,
    input: ResubmissionInput,
  ): Promise<Submission> {
    const existing = await SubmissionRepository.findByAssignment(assignmentId);
    if (!existing || existing.studentId !== actor.uid) {
      throw new SubmissionError('Submission not found.', 'NOT_FOUND');
    }
    if (existing.status !== 'rejected') {
      throw new SubmissionError('Only a rejected submission can be resubmitted.', 'NOT_REJECTED');
    }

    return SubmissionRepository.resubmit(assignmentId, input);
  },

  /**
   * A student's own submission for a given assignment — null means "Not
   * Started" (no submission document exists, or it belongs to someone
   * else and is therefore treated as if it doesn't exist for this actor).
   */
  async getMySubmission(actor: AppUser, assignmentId: string): Promise<Submission | null> {
    const submission = await SubmissionRepository.findByAssignment(assignmentId);
    if (!submission || submission.studentId !== actor.uid) return null;
    return submission;
  },

  /** BR-SUB-005: approved submissions are immutable — reviewing one again is rejected. */
  async reviewSubmission(
    actor: AppUser,
    assignmentId: string,
    input: SubmissionReviewInput,
  ): Promise<Submission> {
    assertAdmin(actor);

    const existing = await SubmissionRepository.findByAssignment(assignmentId);
    if (!existing) {
      throw new SubmissionError('Submission not found.', 'NOT_FOUND');
    }
    if (existing.status === 'approved') {
      throw new SubmissionError('Approved submissions cannot be reviewed again.', 'ALREADY_APPROVED');
    }

    return SubmissionRepository.review(assignmentId, input, actor.uid);
  },

  async listPendingReview(actor: AppUser): Promise<Submission[]> {
    assertAdmin(actor);
    return SubmissionRepository.listPendingReview();
  },
};
