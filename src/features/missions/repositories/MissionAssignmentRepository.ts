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
};
