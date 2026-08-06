/**
 * missions.status per docs/04-Engineering/02-Database-Design.md — a
 * simple 3-value lifecycle for the mission itself. The richer lifecycle
 * described in docs/03-Features/03-Mission-System.md (Assigned, Pending
 * Submission, Submitted, Under Review, Completed, Rejected) describes
 * ASSIGNMENT/SUBMISSION state, not mission state — that lives on
 * missionAssignments/submissions instead, per the same doc's own rule:
 * "Never embed submission logic inside the Mission module."
 */
export type MissionStatus = 'draft' | 'published' | 'archived';

export type MissionDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Fixed set for Phase 1 — Mission-System.md notes categories "should be
 * configurable in future versions," meaning admin-managed categories are
 * explicitly out of scope right now (YAGNI). This is the example list
 * from that same document.
 */
export const MISSION_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'AI',
  'Machine Learning',
  'Data Science',
  'UI/UX',
  'Cyber Security',
  'DevOps',
  'Programming Fundamentals',
] as const;

export type MissionCategory = (typeof MISSION_CATEGORIES)[number];

/**
 * Domain representation of a `missions/{id}` Firestore document.
 * `resourceIds` exists in the schema now so the Resource System (a later
 * milestone) can attach resources without a schema migration — per
 * Mission-System.md's AI Agent Context: "Design mission entities to
 * support future GitHub integration and AI-generated missions without
 * schema redesign." No UI manages this field until that milestone.
 */
export interface Mission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  deadline: Date;
  resourceIds: string[];
  status: MissionStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Fields required to create a new mission (always starts as draft or published). */
export interface NewMissionInput {
  title: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  deadline: Date;
  status: Extract<MissionStatus, 'draft' | 'published'>;
}

/** Fields an admin may change when editing an existing mission. */
export type MissionUpdateInput = Partial<
  Pick<Mission, 'title' | 'description' | 'category' | 'difficulty' | 'deadline' | 'status'>
>;

/**
 * A record that a mission was assigned to a student. Deliberately minimal
 * — per docs/04-Engineering/01-System-Architecture.md §3.9 (Aggregate
 * Design), assignments belong to the Mission aggregate, but SUBMISSION
 * status belongs entirely to the separate submissions collection (M5).
 * This never duplicates or tracks progress/completion state.
 */
export interface MissionAssignment {
  id: string;
  missionId: string;
  studentId: string;
  assignedBy: string;
  assignedAt: Date;
}
