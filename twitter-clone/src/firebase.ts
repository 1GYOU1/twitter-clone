// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdbqui1XniC2uhjZQYiqiS4co-RU1mgtE",
  authDomain: "twitter-clone-435ea.firebaseapp.com",
  projectId: "twitter-clone-435ea",
  storageBucket: "twitter-clone-435ea.appspot.com",
  messagingSenderId: "140568003309",
  appId: "1:140568003309:web:e81b7dda2e60f80860c2e4"
};

/*
  모든 API 키가 포함된 내용 제공 받은 파일.
  활성화한 인증 product에 대한 접근 권한을 얻음. (이메일 인증, GitHub 로그인 인증)
  직접 firebase 홈페이지에서 product(이메일 인증, GitHub 인증)를 활성화(Enable) 해야함. 자동 X.
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);// app에 대한 인증 서비스를 사용