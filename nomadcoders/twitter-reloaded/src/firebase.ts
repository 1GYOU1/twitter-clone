import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKuDa5k-bA_4DT42hEj9TWY1bunHmN9pk",
  authDomain: "twitter-reloaded-42238.firebaseapp.com",
  projectId: "twitter-reloaded-42238",
  storageBucket: "twitter-reloaded-42238.appspot.com",
  messagingSenderId: "746451936550",
  appId: "1:746451936550:web:762ee79ec62fc3ee188de7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);// app에 대한 인증 서비스를 사용