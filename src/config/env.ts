const readEnv = (name: string) => import.meta.env[name] as string | undefined;
export const env = {
  firebase: {
    apiKey: readEnv('VITE_FIREBASE_API_KEY'),
    authDomain: readEnv('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: readEnv('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: readEnv('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: readEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: readEnv('VITE_FIREBASE_APP_ID'),
  },
};
export const hasFirebaseConfiguration = () =>
  Boolean(
    env.firebase.apiKey && env.firebase.authDomain && env.firebase.projectId && env.firebase.appId,
  );
