import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwkXctVezH5YKJopxf_VfEP1aOcKQwnPI",
  authDomain: "photopauvre.firebaseapp.com",
  databaseURL: "https://photopauvre-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "photopauvre",
  storageBucket: "photopauvre.appspot.com",
  messagingSenderId: "868322386129",
  appId: "1:868322386129:web:a82da87e5e813f466f25f0",
  measurementId: "G-N1J7CR0BLE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default { auth, database, storage };