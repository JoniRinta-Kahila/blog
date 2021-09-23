import { FirebaseApp, initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGGqVYPqKow-6QoV6c9MbpDeqjPb1OQnk",
  authDomain: "blog-43f84.firebaseapp.com",
  projectId: "blog-43f84",
  storageBucket: "blog-43f84.appspot.com",
  messagingSenderId: "91859932693",
  appId: "1:91859932693:web:f67fd0935880daaddd201c",
  measurementId: "G-58FYR6K7W4"
};

let firebaseInstance: FirebaseApp;

// const GetAuthInstance = () => {
//   if (!firebaseInstance) {
//     firebaseInstance = initializeApp(firebaseConfig);
//   }
//   return getAuth(firebaseInstance);
// }

// const GetStorageInstance = () => {
//   if (!firebaseInstance) {
//     firebaseInstance = initializeApp(firebaseConfig);
//   }
//   return getStorage(firebaseInstance);
// }

// const GetFirestoreInstance = () => {
//   if (!firebaseInstance) {
//     firebaseInstance = initializeApp(firebaseConfig);
//   }
//   return getFirestore(firebaseInstance);
// }

const InitializeAppCheck = () => {
  if (!firebaseInstance) {
    firebaseInstance = initializeApp(firebaseConfig);
  }

  return initializeAppCheck(firebaseInstance, {
    provider: new ReCaptchaV3Provider('6Le0VIYcAAAAAFWLNunoRyNXqkA3cjTBW_mLfEwm'),
    isTokenAutoRefreshEnabled: true,
  });
}

const GetAuthInstance = () => {
  const appCheckInstance = InitializeAppCheck();
  return getAuth(appCheckInstance.app);
}

const GetFirestoreInstance = () => {
  const appCheckInstance = InitializeAppCheck();
  return getFirestore(appCheckInstance.app);
}

const GetStorageInstance = () => {
  const appCheckInstance = InitializeAppCheck();
  return getStorage(appCheckInstance.app);
}

const FirebaseServices = {
  getAuthInstance: GetAuthInstance,
  getFirestoreInstance: GetFirestoreInstance,
  getStorageInstance: GetStorageInstance,
}

export default FirebaseServices;