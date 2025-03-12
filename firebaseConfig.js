import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBsrnCwAqv2nVSfS-vVUXUHtt4UobJtDUw",
  authDomain: "game-8d5e2.firebaseapp.com",
  databaseURL: "https://game-8d5e2-default-rtdb.firebaseio.com",
  projectId: "game-8d5e2",
  storageBucket: "game-8d5e2.firebasestorage.app",
  messagingSenderId: "468632614136",
  appId: "1:468632614136:web:b8b10c5aa0b4689530b70d",
  measurementId: "G-WCRYXMZ177",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, update };
