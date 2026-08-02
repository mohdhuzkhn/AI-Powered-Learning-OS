import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  where,
  type DocumentData,
} from 'firebase/firestore';
import { requireDb } from '../../../infrastructure/firebase/requireDb';
import type { AppUser, NewUserProfileInput, UserRole, UserStatus } from '../../../types/user.types';

const USERS_COLLECTION = 'users';

/**
 * Raw shape of a `users/{uid}` document as stored in Firestore.
 * Never expose this outside the repository — callers only ever see AppUser.
 */
interface UserDocument extends DocumentData {
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  photoURL?: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLogin?: Timestamp | null;
}

function toAppUser(uid: string, data: UserDocument): AppUser {
  return {
    uid,
    fullName: data.fullName,
    email: data.email,
    role: data.role,
    status: data.status,
    photoURL: data.photoURL ?? undefined,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    lastLogin: data.lastLogin?.toDate(),
  };
}

/**
 * Owns all Firestore access for the `users` collection.
 *
 * This repository never enforces business rules (e.g. "students cannot
 * self-register", "disabled accounts cannot log in") — that belongs to
 * AuthService. The repository's only job is persistence and mapping
 * between the Firestore document shape and the AppUser domain type.
 */
export const UserRepository = {
  /**
   * Looks up a user profile by Firebase Auth UID.
   * Returns null if no profile exists yet — the caller decides what that means.
   */
  async findByUid(uid: string): Promise<AppUser | null> {
    const db = requireDb();
    const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));
    if (!snapshot.exists()) return null;
    return toAppUser(snapshot.id, snapshot.data() as UserDocument);
  },

  /**
   * Creates a new Firestore profile for a user who has already
   * authenticated with Firebase Auth. Always created with status "active"
   * — Phase 1 has no self-registration path, so reaching this point
   * already implies an authorized sign-in.
   */
  async createProfile(input: NewUserProfileInput): Promise<AppUser> {
    const db = requireDb();
    const ref = doc(db, USERS_COLLECTION, input.uid);

    await setDoc(ref, {
      fullName: input.fullName,
      email: input.email,
      role: input.role,
      status: 'active' satisfies UserStatus,
      photoURL: input.photoURL ?? null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });

    const created = await getDoc(ref);
    return toAppUser(created.id, created.data() as UserDocument);
  },

  /**
   * Stamps the profile with the current sign-in time.
   * Called on every successful login, not just the first one.
   */
  async recordLogin(uid: string): Promise<void> {
    const db = requireDb();
    await updateDoc(doc(db, USERS_COLLECTION, uid), {
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Counts active users with the given role — used for admin dashboard
   * stats. Uses a server-side count aggregation so only a number crosses
   * the network, never the matching documents themselves (docs/04-Engineering/06-Performance.md,
   * "avoid reading entire collections"). Requires the caller to be an
   * active admin per firestore.rules' `list` permission on /users.
   */
  async countActiveByRole(role: UserRole): Promise<number> {
    const db = requireDb();
    const activeUsersOfRole = query(
      collection(db, USERS_COLLECTION),
      where('role', '==', role),
      where('status', '==', 'active'),
    );
    const snapshot = await getCountFromServer(activeUsersOfRole);
    return snapshot.data().count;
  },
};
