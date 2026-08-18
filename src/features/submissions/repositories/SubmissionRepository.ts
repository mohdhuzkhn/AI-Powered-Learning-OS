import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
} from 'firebase/firestore';
import { requireDb } from '../../../infrastructure/firebase/requireDb';
import type {
  NewSubmissionInput,
  ResubmissionInput,
  Submission,
  SubmissionReviewInput,
  SubmissionStatus,
} from '../types/submission.types';

const SUBMISSIONS_COLLECTION = 'submissions';

interface SubmissionDocument extends DocumentData {
  assignmentId: string;
  missionId: string;
  studentId: string;
  description: string;
  screenshotUrl: string;
  status: SubmissionStatus;
  feedback: string;
  submittedAt: Timestamp;
  reviewedAt: Timestamp | null;
  reviewedBy: string | null;
}

function toSubmission(id: string, data: SubmissionDocument): Submission {
  return {
    id,
    assignmentId: data.assignmentId,
    missionId: data.missionId,
    studentId: data.studentId,
    description: data.description,
    screenshotUrl: data.screenshotUrl,
    status: data.status,
    feedback: data.feedback,
    submittedAt: data.submittedAt.toDate(),
    reviewedAt: data.reviewedAt?.toDate() ?? null,
    reviewedBy: data.reviewedBy,
  };
}

/**
 * Owns all Firestore access for the `submissions` collection.
 *
 * Like every other repository in this project, this never enforces
 * business rules (e.g. "only assigned students may submit," "approved
 * submissions are immutable") — that belongs to SubmissionService.
 */
export const SubmissionRepository = {
  /**
   * Null means "Not Started" — no submission document exists yet.
   *
   * Subtle Firestore behavior (same issue already solved in
   * MissionAssignmentRepository.findAssignment): firestore.rules' `get`
   * on this collection checks `resource.data.studentId == request.auth.uid`,
   * which requires reading the document to evaluate. If no submission
   * exists yet, Firestore can't prove that check either way and denies
   * with `permission-denied` — NOT a clean "not found" snapshot. Without
   * this catch, every student's very first visit to an unsubmitted
   * mission would show a permission error instead of the submission form.
   */
  async findByAssignment(assignmentId: string): Promise<Submission | null> {
    const db = requireDb();
    try {
      const snapshot = await getDoc(doc(db, SUBMISSIONS_COLLECTION, assignmentId));
      if (!snapshot.exists()) return null;
      return toSubmission(snapshot.id, snapshot.data() as SubmissionDocument);
    } catch (error) {
      const code =
        typeof error === 'object' && error !== null && 'code' in error
          ? String((error as { code: unknown }).code)
          : '';
      if (code === 'permission-denied') return null;
      throw error;
    }
  },

  async create(input: NewSubmissionInput, studentId: string): Promise<Submission> {
    const db = requireDb();
    const ref = doc(db, SUBMISSIONS_COLLECTION, input.assignmentId);

    await setDoc(ref, {
      assignmentId: input.assignmentId,
      missionId: input.missionId,
      studentId,
      description: input.description,
      screenshotUrl: input.screenshotUrl,
      status: 'submitted' satisfies SubmissionStatus,
      feedback: '',
      submittedAt: serverTimestamp(),
      reviewedAt: null,
      reviewedBy: null,
    });

    const created = await getDoc(ref);
    return toSubmission(created.id, created.data() as SubmissionDocument);
  },

  /**
   * Overwrites the existing (rejected) submission with new content and
   * resets it to 'submitted' — clears the previous feedback/review, since
   * this is a fresh attempt being reviewed again.
   */
  async resubmit(assignmentId: string, input: ResubmissionInput): Promise<Submission> {
    const db = requireDb();
    const ref = doc(db, SUBMISSIONS_COLLECTION, assignmentId);

    await updateDoc(ref, {
      description: input.description,
      screenshotUrl: input.screenshotUrl,
      status: 'submitted' satisfies SubmissionStatus,
      feedback: '',
      submittedAt: serverTimestamp(),
      reviewedAt: null,
      reviewedBy: null,
    });

    const updated = await getDoc(ref);
    return toSubmission(updated.id, updated.data() as SubmissionDocument);
  },

  /** BR-SUB-007: a review always sets a decision (approved/rejected) plus feedback. */
  async review(assignmentId: string, input: SubmissionReviewInput, reviewedBy: string): Promise<Submission> {
    const db = requireDb();
    const ref = doc(db, SUBMISSIONS_COLLECTION, assignmentId);

    await updateDoc(ref, {
      status: input.decision,
      feedback: input.feedback,
      reviewedAt: serverTimestamp(),
      reviewedBy,
    });

    const updated = await getDoc(ref);
    return toSubmission(updated.id, updated.data() as SubmissionDocument);
  },

  /** Admin review queue — submissions awaiting a decision. */
  async listPendingReview(): Promise<Submission[]> {
    const db = requireDb();
    const snapshot = await getDocs(
      query(
        collection(db, SUBMISSIONS_COLLECTION),
        where('status', '==', 'submitted' satisfies SubmissionStatus),
      ),
    );
    return snapshot.docs.map((d) => toSubmission(d.id, d.data() as SubmissionDocument));
  },

  /** All of a student's own submissions, any status — their submission history view. */
  async listByStudent(studentId: string): Promise<Submission[]> {
    const db = requireDb();
    const snapshot = await getDocs(
      query(collection(db, SUBMISSIONS_COLLECTION), where('studentId', '==', studentId)),
    );
    return snapshot.docs.map((d) => toSubmission(d.id, d.data() as SubmissionDocument));
  },

  /** Count aggregation, not a full read — same pattern as MissionRepository.countByStatus. */
  async countPendingReview(): Promise<number> {
    const db = requireDb();
    const snapshot = await getCountFromServer(
      query(
        collection(db, SUBMISSIONS_COLLECTION),
        where('status', '==', 'submitted' satisfies SubmissionStatus),
      ),
    );
    return snapshot.data().count;
  },
};