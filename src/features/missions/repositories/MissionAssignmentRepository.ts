import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
  type DocumentData,
} from 'firebase/firestore';
import { requireDb } from '../../../infrastructure/firebase/requireDb';
import type { MissionAssignment } from '../types/mission.types';

const ASSIGNMENTS_COLLECTION = 'missionAssignments';

interface MissionAssignmentDocument extends DocumentData {
  missionId: string;
  studentId: string;
  assignedBy: string;
  assignedAt: Timestamp;
}

function toAssignment(id: string, data: MissionAssignmentDocument): MissionAssignment {
  return {
    id,
    missionId: data.missionId,
    studentId: data.studentId,
    assignedBy: data.assignedBy,
    assignedAt: data.assignedAt.toDate(),
  };
}

/** Deterministic — the same mission+student pair always maps to the same doc. */
function assignmentId(missionId: string, studentId: string): string {
  return `${missionId}_${studentId}`;
}

export const MissionAssignmentRepository = {
  /**
   * Creates the assignment, or silently no-ops if it already exists —
   * `setDoc` on a deterministic ID makes re-assigning the same student
   * to the same mission idempotent rather than creating a duplicate.
   */
  async create(missionId: string, studentId: string, assignedBy: string): Promise<MissionAssignment> {
    const db = requireDb();
    const ref = doc(db, ASSIGNMENTS_COLLECTION, assignmentId(missionId, studentId));

    await setDoc(ref, {
      missionId,
      studentId,
      assignedBy,
      assignedAt: serverTimestamp(),
    });

    const created = await getDoc(ref);
    return toAssignment(created.id, created.data() as MissionAssignmentDocument);
  },

  /** All students currently assigned to a given mission (admin view). */
  async listByMission(missionId: string): Promise<MissionAssignment[]> {
    const db = requireDb();
    const snapshot = await getDocs(
      query(collection(db, ASSIGNMENTS_COLLECTION), where('missionId', '==', missionId)),
    );
    return snapshot.docs.map((d) => toAssignment(d.id, d.data() as MissionAssignmentDocument));
  },

  /** All missions assigned to a given student (used by the student dashboard/list, Task 7). */
  async listByStudent(studentId: string): Promise<MissionAssignment[]> {
    const db = requireDb();
    const snapshot = await getDocs(
      query(collection(db, ASSIGNMENTS_COLLECTION), where('studentId', '==', studentId)),
    );
    return snapshot.docs.map((d) => toAssignment(d.id, d.data() as MissionAssignmentDocument));
  },

  /**
   * Checks whether a specific student is assigned to a specific mission.
   *
   * Subtle Firestore behavior: firestore.rules' `get` on this collection
   * checks `resource.data.studentId == request.auth.uid`, which requires
   * reading the document to evaluate. If the assignment doesn't exist,
   * Firestore can't prove the check either way and denies with
   * `permission-denied` — NOT a clean "not found" snapshot. In this
   * context that's equivalent to "not assigned," so it's translated to
   * null rather than left to bubble up as an unexpected error.
   */
  async findAssignment(missionId: string, studentId: string): Promise<MissionAssignment | null> {
    const db = requireDb();
    const ref = doc(db, ASSIGNMENTS_COLLECTION, assignmentId(missionId, studentId));

    try {
      const snapshot = await getDoc(ref);
      if (!snapshot.exists()) return null;
      return toAssignment(snapshot.id, snapshot.data() as MissionAssignmentDocument);
    } catch (error) {
      const code =
        typeof error === 'object' && error !== null && 'code' in error
          ? String((error as { code: unknown }).code)
          : '';
      if (code === 'permission-denied') return null;
      throw error;
    }
  },
};
