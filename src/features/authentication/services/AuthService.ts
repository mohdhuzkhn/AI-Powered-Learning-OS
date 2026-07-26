import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';
import { getFirebaseServices } from '../../../infrastructure/firebase/firebase';
import { UserRepository } from '../repositories/UserRepository';
import type { AppUser } from '../../../types/user.types';

/**
 * Business-friendly error thrown by every AuthService method.
 * UI components display `.message` directly — raw Firebase error codes
 * never reach the user (docs/04-Engineering/05-Security.md §15).
 */
export class AuthError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

function requireAuth() {
  const services = getFirebaseServices();
  if (!services) {
    throw new AuthError(
      'Firebase is not configured. Check your environment variables.',
      'CONFIG_MISSING',
    );
  }
  return services.auth;
}

/** Translates raw Firebase Auth error codes into user-facing messages. */
function translateFirebaseError(error: unknown): AuthError {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code: unknown }).code)
      : 'unknown';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return new AuthError('Invalid email or password.', code);
    case 'auth/too-many-requests':
      return new AuthError('Too many attempts. Please try again later.', code);
    case 'auth/popup-closed-by-user':
      return new AuthError('Sign-in was cancelled.', code);
    case 'auth/network-request-failed':
      return new AuthError('Network error. Check your connection and try again.', code);
    default:
      return new AuthError('Something went wrong. Please try again.', code);
  }
}

/**
 * Resolves the Firestore profile that belongs to an already-authenticated
 * Firebase user. Throws AuthError — never signs the user out itself; the
 * caller decides what "no valid profile" should do to the Firebase session.
 *
 * Policy (docs/03-Features/01-Authentication.md):
 * - Google sign-in may auto-create a profile on first login (role
 *   defaults to "student" — least privilege; admins are promoted manually).
 * - Email/password sign-in and session restoration never auto-create —
 *   an admin must have already provisioned the Firestore profile.
 */
async function resolveProfile(
  firebaseUser: FirebaseUser,
  options: { autoCreate: boolean },
): Promise<AppUser> {
  const existing = await UserRepository.findByUid(firebaseUser.uid);

  if (existing) {
    if (existing.status === 'disabled') {
      throw new AuthError(
        'This account has been disabled. Contact an administrator.',
        'ACCOUNT_DISABLED',
      );
    }
    await UserRepository.recordLogin(firebaseUser.uid);
    return existing;
  }

  if (!options.autoCreate) {
    throw new AuthError(
      'No account was found for this login. Contact an administrator to be added to Learning OS.',
      'PROFILE_NOT_FOUND',
    );
  }

  return UserRepository.createProfile({
    uid: firebaseUser.uid,
    fullName: firebaseUser.displayName ?? firebaseUser.email ?? 'Unnamed User',
    email: firebaseUser.email ?? '',
    role: 'student',
    photoURL: firebaseUser.photoURL ?? undefined,
  });
}

/**
 * UID of a sign-in currently being resolved by signInWithGoogle/signInWithEmail.
 *
 * Firebase fires onAuthStateChanged as soon as the popup/credential call
 * succeeds — before our own resolveProfile() call (a separate Firestore
 * round-trip) has finished. Without this guard, the listener below could
 * run resolveProfile a second time for the same sign-in, see no profile
 * yet, and incorrectly treat a fresh Google user as unprovisioned. The
 * explicit sign-in methods set this lock before resolving the profile so
 * the listener knows to skip that particular auth state change.
 */
let inFlightUid: string | null = null;

async function signInAndResolve(
  performSignIn: () => Promise<FirebaseUser>,
  options: { autoCreate: boolean },
): Promise<AppUser> {
  const auth = requireAuth();
  let firebaseUser: FirebaseUser;

  try {
    firebaseUser = await performSignIn();
  } catch (error) {
    throw translateFirebaseError(error);
  }

  inFlightUid = firebaseUser.uid;
  try {
    return await resolveProfile(firebaseUser, options);
  } catch (error) {
    // The Firebase Auth sign-in succeeded but there's no valid app access
    // (disabled account, or no profile provisioned) — don't leave the
    // browser holding a Firebase session the user can't do anything with.
    await firebaseSignOut(auth).catch(() => undefined);
    throw error;
  } finally {
    inFlightUid = null;
  }
}

export const AuthService = {
  async signInWithGoogle(): Promise<AppUser> {
    return signInAndResolve(
      async () => (await signInWithPopup(requireAuth(), new GoogleAuthProvider())).user,
      { autoCreate: true },
    );
  },

  async signInWithEmail(email: string, password: string): Promise<AppUser> {
    return signInAndResolve(
      async () => (await signInWithEmailAndPassword(requireAuth(), email, password)).user,
      { autoCreate: false },
    );
  },

  /**
   * Sends a password reset email. Deliberately does not distinguish
   * "email not found" from success — surfacing that difference lets an
   * attacker enumerate which emails have accounts (OWASP user enumeration).
   * The UI always shows the same "check your inbox" message either way.
   */
  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(requireAuth(), email);
    } catch (error) {
      const code =
        typeof error === 'object' && error !== null && 'code' in error
          ? String((error as { code: unknown }).code)
          : '';
      if (code === 'auth/user-not-found') {
        return;
      }
      throw translateFirebaseError(error);
    }
  },

  async signOut(): Promise<void> {
    await firebaseSignOut(requireAuth());
  },

  /**
   * Subscribes to Firebase Auth session state (page load, refresh, token
   * expiry, sign-out from another tab) and resolves the matching Firestore
   * profile for each change. Skips any UID currently being handled by an
   * explicit sign-in call above (see `inFlightUid`) to avoid resolving the
   * same profile twice with conflicting policies.
   */
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    const auth = requireAuth();
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }
      if (firebaseUser.uid === inFlightUid) {
        return;
      }

      try {
        const profile = await resolveProfile(firebaseUser, { autoCreate: false });
        callback(profile);
      } catch {
        // Session no longer maps to valid app access (disabled or no
        // profile) — end the Firebase session too, per BR-004.
        await firebaseSignOut(auth).catch(() => undefined);
        callback(null);
      }
    });
  },
};