import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAhnazsTtgWeD2CN63_L0__8L6WV-CAK5w',
  authDomain: 'music-d329d.firebaseapp.com',
  databaseURL: 'https://music-d329d-default-rtdb.firebaseio.com',
  projectId: 'music-d329d',
  storageBucket: 'music-d329d.appspot.com',
  messagingSenderId: '158365610510',
  appId: '1:158365610510:web:0c1e5e11a49911c0df825f',
  measurementId: 'G-JFRFSGTN70',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const realtimeDatabase = getDatabase();
