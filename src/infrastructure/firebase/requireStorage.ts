import type { FirebaseStorage } from 'firebase/storage';
import { getFirebaseServices } from './firebase';

/**
 * Same rationale as requireDb.ts — fail fast with a clear message
 * instead of a confusing downstream Firebase SDK exception.
 */
export function requireStorage(): FirebaseStorage {
  const services = getFirebaseServices();
  if (!services) {
    throw new Error('Firebase is not configured. Check your environment variables.');
  }
  return services.storage;
}
