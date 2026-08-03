import type { AppUser } from '../../../types/user.types';
import { MissionRepository } from '../repositories/MissionRepository';
import type { Mission, MissionUpdateInput, NewMissionInput } from '../types/mission.types';

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
};
