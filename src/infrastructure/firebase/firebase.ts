import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { env, hasFirebaseConfiguration } from '../../config/env';

export interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}
let services: FirebaseServices | undefined;
export function getFirebaseServices(): FirebaseServices | undefined {
  if (!hasFirebaseConfiguration()) return undefined;
  if (!services) {
    const app = getApps().length ? getApp() : initializeApp(env.firebase);
    services = { app, auth: getAuth(app), db: getFirestore(app), storage: getStorage(app) };
  }
  return services;
}
