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
    case 'permission-denied':
      return new AuthError(
        'Access to your account data was denied. This usually means Firestore security rules are missing or misconfigured.',
        code,
      );
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
 * True while an explicit signInWithGoogle/signInWithEmail call is resolving.
 *
 * This MUST be set before performSignIn() is even called, not after it
 * resolves. Firebase fires onAuthStateChanged as part of completing the
 * sign-in internally — there is no guarantee our own code resumes before
 * that listener runs. An earlier version of this guard set a UID lock only
 * after `await performSignIn()` returned, which left exactly that window
 * open: the listener could see a brand-new UID with autoCreate:false,
 * throw "no profile found", and force a signOut() — destroying the session
 * moments after this function's own resolveProfile() call had already
 * created the Firestore profile. Symptom in practice: the profile shows up
 * in Firestore, but the app ends up signed out anyway. A boolean set
 * synchronously before any async work begins has no such window.
 */
let signInInProgress = false;

async function signInAndResolve(
  performSignIn: () => Promise<FirebaseUser>,
  options: { autoCreate: boolean },
): Promise<AppUser> {
  const auth = requireAuth();
  signInInProgress = true;

  try {
    let firebaseUser: FirebaseUser;
    try {
      firebaseUser = await performSignIn();
    } catch (error) {
      throw translateFirebaseError(error);
    }

    try {
      return await resolveProfile(firebaseUser, options);
    } catch (error) {
      // The Firebase Auth sign-in succeeded but there's no valid app access
      // (disabled account, no profile provisioned, or a Firestore-level
      // failure like missing security rules) — don't leave the browser
      // holding a Firebase session the user can't do anything with.
      await firebaseSignOut(auth).catch(() => undefined);
      throw error instanceof AuthError ? error : translateFirebaseError(error);
    }
  } finally {
    signInInProgress = false;
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
   * profile for each change. Skips entirely while an explicit sign-in call
   * above is in progress (see `signInInProgress`) — that call owns
   * resolving this particular auth state change, including deciding
   * whether to sign back out on failure.
   */
  onAuthStateChanged(callback: (user: AppUser | null) => void): () => void {
    const auth = requireAuth();
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (signInInProgress) {
        return;
      }
      if (!firebaseUser) {
        callback(null);
        return;
      }

      try {
        const profile = await resolveProfile(firebaseUser, { autoCreate: false });
        callback(profile);
      } catch (error) {
        // Session no longer maps to valid app access (disabled, no
        // profile, or a Firestore-level failure) — end the Firebase
        // session too, per BR-004. Logged (not silently swallowed) so a
        // rules-misconfiguration is diagnosable from the browser console.
        console.error('Session restoration failed:', error);
        await firebaseSignOut(auth).catch(() => undefined);
        callback(null);
      }
    });
  },
};