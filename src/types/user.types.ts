export type UserRole = 'admin' | 'student';

/**
 * An account that has been disabled can never authenticate (BR-003, BR-004
 * in docs/03-Features/01-Authentication.md). There is no "pending" state in
 * Phase 1 because students never self-register — an admin creates the
 * Firestore profile (and, for email/password, the Firebase Auth user)
 * directly in an already-active state.
 */
export type UserStatus = 'active' | 'disabled';

/**
 * Domain representation of a Learning OS user, sourced from the `users`
 * Firestore collection (docs/04-Engineering/02-Database-Design.md).
 * Repositories are responsible for mapping the raw Firestore document
 * (Timestamp fields) into this shape (Date fields) before it leaves the
 * infrastructure layer — see Chapter 6.7 (DTOs) in 01-System-Architecture.md.
 */
export interface AppUser {
  uid: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

/**
 * Data required to create a brand-new Firestore user profile.
 * Server-managed fields (status, createdAt, updatedAt, lastLogin) are
 * intentionally excluded — the repository owns those.
 */
export interface NewUserProfileInput {
  uid: string;
  fullName: string;
  email: string;
  role: UserRole;
  photoURL?: string;
}
