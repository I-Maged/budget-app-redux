import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAVDHJLLUOWFcxAt2s1ykF5BWHYTFbHio0',
  authDomain: 'budget-app-ed086.firebaseapp.com',
  projectId: 'budget-app-ed086',
  storageBucket: 'budget-app-ed086.appspot.com',
  messagingSenderId: '564919758535',
  appId: '1:564919758535:web:05b6477331f5dcdaa3d8e2',
};

initializeApp(firebaseConfig);
export const db = getFirestore();
