import { AuthService } from '../../authentication/services/AuthService';
import type { AppUser } from '../../../types/user.types';
import { MissionAssignmentRepository } from '../repositories/MissionAssignmentRepository';
import { MissionRepository } from '../repositories/MissionRepository';
import type {
  Mission,
  MissionAssignment,
  MissionUpdateInput,
  NewMissionInput,
} from '../types/mission.types';

/**
 * Business-friendly error thrown by every MissionService method — mirrors
 * AuthError's role in the authentication feature. UI components display
 * `.message` directly.
 */
export class MissionError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'MissionError';
    this.code = code;
  }
}

function assertAdmin(actor: AppUser): void {
  if (actor.role !== 'admin') {
    throw new MissionError('Only administrators can manage missions.', 'FORBIDDEN');
  }
}

/**
 * BR: "Deadline cannot be earlier than creation date" / validation rule
 * "Future date only" (docs/03-Features/03-Mission-System.md).
 */
function assertFutureDeadline(deadline: Date): void {
  if (deadline.getTime() <= Date.now()) {
    throw new MissionError('Deadline must be in the future.', 'INVALID_DEADLINE');
  }
}

/**
 * Application service for the Mission domain. Owns the business rules
 * MissionRepository deliberately does not — authorization, and lifecycle
 * rules like "archived missions cannot be edited" (BR-MIS-004).
 */
export const MissionService = {
  async createMission(actor: AppUser, input: NewMissionInput): Promise<Mission> {
    assertAdmin(actor);
    assertFutureDeadline(input.deadline);
    return MissionRepository.create(input, actor.uid);
  },

  async updateMission(
    actor: AppUser,
    missionId: string,
    input: MissionUpdateInput,
  ): Promise<Mission> {
    assertAdmin(actor);

    const existing = await MissionRepository.findById(missionId);
    if (!existing) {
      throw new MissionError('Mission not found.', 'NOT_FOUND');
    }
    if (existing.status === 'archived') {
      throw new MissionError('Archived missions cannot be edited.', 'MISSION_ARCHIVED');
    }
    if (input.deadline !== undefined) {
      assertFutureDeadline(input.deadline);
    }

    return MissionRepository.update(missionId, input);
  },

  /** "Delete" — soft, via archive. See MissionRepository.archive for why. */
  async archiveMission(actor: AppUser, missionId: string): Promise<void> {
    assertAdmin(actor);

    const existing = await MissionRepository.findById(missionId);
    if (!existing) {
      throw new MissionError('Mission not found.', 'NOT_FOUND');
    }

    return MissionRepository.archive(missionId);
  },

  /** Any authenticated user may look up a single mission — firestore.rules
   *  already restricts this to published/archived for non-admins. */
  async getMission(missionId: string): Promise<Mission | null> {
    return MissionRepository.findById(missionId);
  },

  async listAllMissions(actor: AppUser): Promise<Mission[]> {
    assertAdmin(actor);
    return MissionRepository.listAll();
  },

  async listPublishedMissions(): Promise<Mission[]> {
    return MissionRepository.listPublished();
  },

  /**
   * Assigns a mission to a student. Enforces BR-MIS-003 ("Only Published
   * missions can be assigned") and validates the target is an actual
   * active student — never trusts a studentId the client happened to send
   * (docs/.ai/architecture/07-Security.md: "never trust the client").
   * Goes through AuthService, not UserRepository directly, per the
   * cross-feature dependency rule.
   */
  async assignMission(actor: AppUser, missionId: string, studentId: string): Promise<MissionAssignment> {
    assertAdmin(actor);

    const [mission, student] = await Promise.all([
      MissionRepository.findById(missionId),
      AuthService.getUserProfile(studentId),
    ]);

    if (!mission) {
      throw new MissionError('Mission not found.', 'NOT_FOUND');
    }
    if (mission.status !== 'published') {
      throw new MissionError('Only published missions can be assigned.', 'MISSION_NOT_PUBLISHED');
    }
    if (!student || student.role !== 'student' || student.status !== 'active') {
      throw new MissionError('Selected student is not available for assignment.', 'INVALID_STUDENT');
    }

    return MissionAssignmentRepository.create(missionId, studentId, actor.uid);
  },

  async listAssignedStudents(actor: AppUser, missionId: string): Promise<MissionAssignment[]> {
    assertAdmin(actor);
    return MissionAssignmentRepository.listByMission(missionId);
  },

  /**
   * Missions assigned to the current student. No admin check — any
   * authenticated student may see their own assignments, matches
   * firestore.rules' `resource.data.studentId == request.auth.uid`.
   * Archived missions are excluded — BR-MIS-005 ("Deleted missions are
   * hidden from users") applies here; archiving is the soft-delete
   * mechanism, so an archived mission should disappear from the
   * student's view even if they were previously assigned to it. The
   * audit trail Database-Design.md describes is an admin-facing concern
   * (admins retain full visibility via listAssignedStudents), not a
   * student-facing one.
   */
  async listMyAssignedMissions(actor: AppUser): Promise<Mission[]> {
    const assignments = await MissionAssignmentRepository.listByStudent(actor.uid);
    const missions = await Promise.all(
      assignments.map((assignment) => MissionRepository.findById(assignment.missionId)),
    );
    return missions.filter(
      (mission): mission is Mission => mission !== null && mission.status === 'published',
    );
  },

  /**
   * A single mission, scoped to the student actually being assigned to
   * it — not just "any published mission," even though firestore.rules'
   * baseline permission would technically allow reading any published
   * mission by ID. This extra restriction lives here deliberately: a
   * student typing another mission's ID into the URL should see "not
   * found," not a mission they were never assigned. Archived missions
   * are treated as not-found too, for the same reason as
   * listMyAssignedMissions above.
   */
  async getAssignedMissionForStudent(actor: AppUser, missionId: string): Promise<Mission | null> {
    const assignment = await MissionAssignmentRepository.findAssignment(missionId, actor.uid);
    if (!assignment) return null;

    const mission = await MissionRepository.findById(missionId);
    if (!mission || mission.status === 'archived') return null;

    return mission;
  },
};
