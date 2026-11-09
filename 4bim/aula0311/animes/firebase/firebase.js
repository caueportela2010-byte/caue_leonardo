
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp, getApps, getApp } from 'firebase/app';

import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwZTa73XVqVxSs71DXkmb45HjvLXH4vQE",
  authDomain: "apps-76b06.firebaseapp.com",
  projectId: "apps-76b06",
  storageBucket: "apps-76b06.firebasestorage.app",
  messagingSenderId: "499776236425",
  appId: "1:499776236425:web:f08504024db76cf45e4f58"
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);
