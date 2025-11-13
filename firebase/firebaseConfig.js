import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-oYNs4cmDyiwt9fSHj-Bhq2bO1uZUmaA",
  authDomain: "pokeapi-875be.firebaseapp.com",
  projectId: "pokeapi-875be",
  storageBucket: "pokeapi-875be.firebasestorage.app",
  messagingSenderId: "643503817731",
  appId: "1:643503817731:web:c7609f407c087b43e0ba36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };