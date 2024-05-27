import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfjZEOdKsIPbElfsXNZPTVMd1RLTuxlmE",
  authDomain: "plasticart-cb41e.firebaseapp.com",
  projectId: "plasticart-cb41e",
  storageBucket: "plasticart-cb41e.appspot.com",
  messagingSenderId: "967593662517",
  appId: "1:967593662517:web:ebbab9ce8d4643b50af97c",
  measurementId: "G-GEJ4H0GR72",
};

const app = initializeApp(firebaseConfig);

const appFirestore = getFirestore(app);
const appStorage = getStorage(app);
const appAuth = getAuth(app);

export { appStorage, appAuth, appFirestore };
