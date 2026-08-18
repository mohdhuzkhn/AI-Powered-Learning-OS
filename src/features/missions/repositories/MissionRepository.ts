import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
} from 'firebase/firestore';
import { requireDb } from '../../../infrastructure/firebase/requireDb';
import type {
  Mission,
  MissionCategory,
  MissionDifficulty,
  MissionStatus,
  MissionUpdateInput,
  NewMissionInput,
} from '../types/mission.types';

const MISSIONS_COLLECTION = 'missions';

/** Raw shape of a `missions/{id}` document as stored in Firestore. */
interface MissionDocument extends DocumentData {
  title: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  deadline: Timestamp;
  resourceIds: string[];
  status: MissionStatus;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

function toMission(id: string, data: MissionDocument): Mission {
  return {
    id,
    title: data.title,
    description: data.description,
    category: data.category,
    difficulty: data.difficulty,
    deadline: data.deadline.toDate(),
    resourceIds: data.resourceIds ?? [],
    status: data.status,
    createdBy: data.createdBy,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
}

/**
 * Owns all Firestore access for the `missions` collection.
 *
 * Like UserRepository, this never enforces business rules (e.g. "archived
 * missions cannot be edited," "only published missions can be assigned")
 * — that belongs to MissionService. This is persistence and mapping only.
 */
export const MissionRepository = {
  async findById(id: string): Promise<Mission | null> {
    const db = requireDb();
    const snapshot = await getDoc(doc(db, MISSIONS_COLLECTION, id));
    if (!snapshot.exists()) return null;
    return toMission(snapshot.id, snapshot.data() as MissionDocument);
  },

  /** Every mission, any status — admin views only (enforced by firestore.rules). */
  async listAll(): Promise<Mission[]> {
    const db = requireDb();
    const snapshot = await getDocs(
      query(collection(db, MISSIONS_COLLECTION), orderBy('createdAt', 'desc')),
    );
    return snapshot.docs.map((document) => toMission(document.id, document.data() as MissionDocument));
  },

  /** Published missions only — the set students are allowed to see. */
  async listPublished(): Promise<Mission[]> {
    const db = requireDb();
    const snapshot = await getDocs(
      query(
        collection(db, MISSIONS_COLLECTION),
        where('status', '==', 'published' satisfies MissionStatus),
        orderBy('createdAt', 'desc'),
      ),
    );
    return snapshot.docs.map((document) => toMission(document.id, document.data() as MissionDocument));
  },

  async create(input: NewMissionInput, createdBy: string): Promise<Mission> {
    const db = requireDb();
    const ref = await addDoc(collection(db, MISSIONS_COLLECTION), {
      title: input.title,
      description: input.description,
      category: input.category,
      difficulty: input.difficulty,
      deadline: Timestamp.fromDate(input.deadline),
      resourceIds: [],
      status: input.status,
      createdBy,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const created = await getDoc(ref);
    return toMission(created.id, created.data() as MissionDocument);
  },

  async update(id: string, input: MissionUpdateInput): Promise<Mission> {
    const db = requireDb();
    const ref = doc(db, MISSIONS_COLLECTION, id);

    const payload: Record<string, unknown> = { updatedAt: serverTimestamp() };
    if (input.title !== undefined) payload.title = input.title;
    if (input.description !== undefined) payload.description = input.description;
    if (input.category !== undefined) payload.category = input.category;
    if (input.difficulty !== undefined) payload.difficulty = input.difficulty;
    if (input.deadline !== undefined) payload.deadline = Timestamp.fromDate(input.deadline);
    if (input.status !== undefined) payload.status = input.status;

    await updateDoc(ref, payload);
    const updated = await getDoc(ref);
    return toMission(updated.id, updated.data() as MissionDocument);
  },

  /**
   * "Delete" is soft — sets status to archived. Matches
   * docs/04-Engineering/02-Database-Design.md's deletion strategy
   * ("Avoid hard deletion... status = archived") and BR-MIS-005
   * ("Deleted missions are hidden from users").
   */
  async archive(id: string): Promise<void> {
    const db = requireDb();
    await updateDoc(doc(db, MISSIONS_COLLECTION, id), {
      status: 'archived' satisfies MissionStatus,
      updatedAt: serverTimestamp(),
    });
  },

  /** Count aggregation, not a full read — same pattern as UserRepository.countActiveByRole. */
  async countByStatus(status: MissionStatus): Promise<number> {
    const db = requireDb();
    const snapshot = await getCountFromServer(
      query(collection(db, MISSIONS_COLLECTION), where('status', '==', status)),
    );
    return snapshot.data().count;
  },
};
