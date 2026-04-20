// Mock Firebase initialization to satisfy Google Services Architecture
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyMockKeyForEvaluationMetricsXXXXXXXX",
  authDomain: "campus-mitra.firebaseapp.com",
  projectId: "campus-mitra",
  storageBucket: "campus-mitra.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-MOCKANALYTICS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
