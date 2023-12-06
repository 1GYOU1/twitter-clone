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

/*
  모든 API 키가 포함된 내용 제공 받은 파일.
  활성화한 인증 product에 대한 접근 권한을 얻음. (이메일 인증, GitHub 로그인 인증)
  직접 firebase 홈페이지에서 product(이메일 인증, GitHub 인증)를 활성화(Enable) 해야함. 자동 X.
*/

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);// app에 대한 인증 서비스를 사용