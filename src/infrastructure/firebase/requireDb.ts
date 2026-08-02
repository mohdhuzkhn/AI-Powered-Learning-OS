import type { Firestore } from 'firebase/firestore';
import { getFirebaseServices } from './firebase';

/**
 * Firestore is only reachable once environment configuration exists.
 * Failing fast here gives every repository a clear, actionable error
 * instead of a confusing downstream Firebase SDK exception.
 */
export function requireDb(): Firestore {
  const services = getFirebaseServices();
  if (!services) {
    throw new Error('Firebase is not configured. Check your environment variables.');
  }
  return services.db;
}
