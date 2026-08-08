import {
  collection,
  doc,
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
  /** Null means "Not Started" — no submission document exists yet. */
  async findByAssignment(assignmentId: string): Promise<Submission | null> {
    const db = requireDb();
    const snapshot = await getDoc(doc(db, SUBMISSIONS_COLLECTION, assignmentId));
    if (!snapshot.exists()) return null;
    return toSubmission(snapshot.id, snapshot.data() as SubmissionDocument);
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
};
