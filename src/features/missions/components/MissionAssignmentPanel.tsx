import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { AuthService } from '../../authentication/services/AuthService';
import type { AppUser } from '../../../types/user.types';
import { MissionError, MissionService } from '../services/MissionService';
import type { Mission, MissionAssignment } from '../types/mission.types';

type PanelState =
  | { status: 'loading' }
  | { status: 'loaded'; students: AppUser[]; assignments: MissionAssignment[] }
  | { status: 'error'; message: string };

export function MissionAssignmentPanel({ mission }: { mission: Mission }) {
  const { user } = useAuth();
  const [state, setState] = useState<PanelState>({ status: 'loading' });
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || mission.status !== 'published') return;
    let cancelled = false;

    Promise.all([
      AuthService.listActiveUsersByRole('student'),
      MissionService.listAssignedStudents(user, mission.id),
    ])
      .then(([students, assignments]) => {
        if (!cancelled) setState({ status: 'loaded', students, assignments });
      })
      .catch((error: unknown) => {
        console.error('Failed to load assignment data:', error);
        if (!cancelled) {
          setState({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to load students.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user, mission.id, mission.status]);

  const handleAssign = async () => {
    if (!user || !selectedStudentId || state.status !== 'loaded') return;

    setIsAssigning(true);
    setAssignError(null);
    try {
      const newAssignment = await MissionService.assignMission(user, mission.id, selectedStudentId);
      setState({ ...state, assignments: [...state.assignments, newAssignment] });
      setSelectedStudentId('');
    } catch (error) {
      setAssignError(
        error instanceof MissionError ? error.message : 'Unable to assign mission. Please try again.',
      );
    } finally {
      setIsAssigning(false);
    }
  };

  if (mission.status !== 'published') {
    return (
      <div className="mission-details-card">
        <h2>Assigned students</h2>
        <p className="assignment-hint">Publish this mission before assigning it to students.</p>
      </div>
    );
  }

  if (state.status === 'loading') {
    return (
      <div className="mission-details-card">
        <h2>Assigned students</h2>
        <p className="assignment-hint">Loading…</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="mission-details-card">
        <h2>Assigned students</h2>
        <div className="auth-error" role="alert">
          {state.message}
        </div>
      </div>
    );
  }

  const assignedIds = new Set(state.assignments.map((assignment) => assignment.studentId));
  const assignedStudents = state.students.filter((student) => assignedIds.has(student.uid));
  const availableStudents = state.students.filter((student) => !assignedIds.has(student.uid));

  return (
    <div className="mission-details-card">
      <h2>Assigned students</h2>

      {assignError && (
        <div className="auth-error" role="alert">
          {assignError}
        </div>
      )}

      {assignedStudents.length === 0 ? (
        <p className="assignment-hint">No students assigned yet.</p>
      ) : (
        <ul className="assigned-student-list">
          {assignedStudents.map((student) => (
            <li key={student.uid}>{student.fullName}</li>
          ))}
        </ul>
      )}

      {availableStudents.length > 0 ? (
        <div className="assign-student-form">
          <select
            value={selectedStudentId}
            onChange={(event) => setSelectedStudentId(event.target.value)}
          >
            <option value="">Select a student…</option>
            {availableStudents.map((student) => (
              <option key={student.uid} value={student.uid}>
                {student.fullName}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="secondary-button"
            onClick={() => void handleAssign()}
            disabled={!selectedStudentId || isAssigning}
          >
            {isAssigning ? 'Assigning…' : 'Assign'}
          </button>
        </div>
      ) : (
        <p className="assignment-hint">Every active student is already assigned to this mission.</p>
      )}
    </div>
  );
}
