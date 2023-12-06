## 트위터 클론코딩 [2023 UPDATE]

<!-- 2023-10-04 ~  -->

#### 배우는 이론
- Firebase
- Cloud Firestore
- NoSQL Realtime, Query, Filter
- Firebase Authentication
- Google Cloud Storage

#### 구현하는 기능
- mail, Google, Github, Social Authentication
- Tweet CRUD
- Protected Pages
- Profile Page
- File Upload
- Deploy
- API Key Security

#### 패키지
- "React"
- "React Hooks"
- "React Router"
- "Firebase"
- "Create React App"
- "Github Pages"

<br>

## Chapter 2 - SETUP

### #1.0 Installation

[commit history](https://github.com/1GYOU1/twitter-reloaded/commit/7c1c73213a71d93d46b8c3df41156a8861330921)

create react app 과 Vite 사용은 결과가 같으나 해당 프로젝트에서는 Vite 사용 !

① [Vite - Guide](https://vitejs.dev/guide/) - 세팅 시작 !

>$ npm create vite@latest

② 엔터를 누르면 vite의 최신 버전을 설치하겠냐고 묻는 프롬프트가 나옴 -> yes 선택

create-vite@4.4.1

>$ Ok to proceed? (y) 

③ 프로젝트 명 입력

>$ Project name: … twitter-reloaded

④ 프레임워크 선택 - React

>$ ✔ Select a framework: › React

⑤ Typescript or Javascript 사용 선택

SWC -> Rust typescript 컴파일러

>$ ✔ Select a variant: › TypeScript + SWC

⑥ 프로젝트 폴더 진입

>$ cd twitter-reloaded

⑦ npm install

>$ npm i

⑧ 제대로 작동하는지 확인 

>$ npm run dev

➈ 파일 정리하기
- index.css 삭제 
- App.css 삭제
- App.tsx 코드 정리
```tsx
function App() {

  return (
    <>
    </>
  )
}

export default App
```
- index.html - title 변경, logo 삭제

➉ 추가 기능 설치
>$ npm i react-router-dom@6.14.2

>$ npm i styled-reset

>$ npm i styled-components@6.0.7

>$ npm i types styled components -D

<br>

### #1.1 Routing

[commit history](https://github.com/1GYOU1/twitter-reloaded/commit/fc19cb00b084d7c593e17428676d6d475af35e7c)

nomadcoders/twitter-reloaded/src/App.tsx

```js
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,//하단 페이지에서의 공통 include 파일
    children: [
      {
        path: "",// http://localhost:5173
        element: <Home />,
      },
      {
        path: "profile",// http://localhost:5173/profile
        element: <Profile />,
      },
    ],
  },
  {//여기서부터는 <Layout /> 공통 includes 아님.
    path: "/login",// http://localhost:5173/login
    element: <Login />,
  },
  {
    path: "/create-account",// http://localhost:5173/create-account
    element: <CreateAccount />,
  },
]);

//style components를 이용해 글로벌 스타일 사용
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {

  return (
    <>
      <GlobalStyles />{/* 글로벌 스타일 적용 */}
      <RouterProvider router={router} />{/* router 전달 */}
    </>
  );
}

export default App;
```

<br>

### #1.2 LoadingScreen

[commit history](https://github.com/1GYOU1/twitter-reloaded/commit/de4ce5ac9564cf1ea112429a5c44b0da72b11062)

#### 파이어베이스 authentication에 필요한 간단한 로직 구현하기
- firebase authentication 작동 방식 - 얘네가 필요한 쿠키, 토큰 등을 담당함.
  - firebase SDK
  - firebase server

- 유저인증에 관한 작업은 전부 firebase가 해줌.
- firebase sdk가 로그인 유무, 유저정보를 보낼 때 까지 보여줄 loading screen 만들기
- 특별히 sdk의 작업종료를 확인할 필요 없음. 2초간 화면을 가려줄 Loading 컴포넌트를 만들기

<br>

nomadcoders/twitter-reloaded/src/App.tsx
```js
...
function App() {

  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    
    // wait for firebase
    
    // 육안으로 확인하기 위해서 임의로 2초로 설정해서 확인. 
    // setTimeout(() => setLoading(false), 2000)

    // 실제는 로딩화면을 보기 어려울 정도로 firebaser가 빠르게 처리.
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* 로딩이 끝나면 RouterProvider를 보여줌 */}
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App
```

<br>


### #2.3 Firebase Project

#### 파이어베이스 로그인페이지 구현 초기설정

① firebase 홈페이지에 로그인 후, 새 프로젝트 생성하기 버튼 클릭

https://firebase.google.com/?hl=ko

② 프로젝트 이름 정하기 - twitter-reloaded

③ Google Analytics 비활성화 - 활성화해도 됨.

④ continue 버튼 클릭하고, web 아이콘 클릭

⑤ app 이름 정하기 - web

⑥ set up Firebase Hosting 체크 해제

⑦ Firebase를 우리의 API key로 초기화 하기 위해 하단 명령어 입력.

>$ npm install firebase@10.1.0

⑧ 하단 파일 생성하여 firebase 페이지에 나타나는 하단 코드 복사 붙여넣기.

nomadcoders/twitter-reloaded/src/firebase.ts

```ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKuDa5k-bA_4DT42hEj9TWY1bunHmN9pk",
  authDomain: "twitter-reloaded-42238.firebaseapp.com",
  projectId: "twitter-reloaded-42238",
  storageBucket: "twitter-reloaded-42238.appspot.com",
  messagingSenderId: "746451936550",
  appId: "1:746451936550:web:762ee79ec62fc3ee188de7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

<br>

## Chapter 3 - AUTHENTICATION

### #3.0 Setup ~ #3.4 Log In

#### 파이어베이스 사용해서 로그인 페이지, 회원가입 페이지 구현 셋업

① 하단 파이어베이스 페이지에서 내 프로젝트를 선택 > Authentication 클릭 > 시작하기 버튼 클릭
- 빌드 섹션에서도 찾을 수 있음
- https://console.firebase.google.com/

② 로그인 방법을 추가하여 Firebase 인증 시작하기 - 이메일/비밀번호 선택 > 활성화

③ [사용법은 commit 내용 참조](https://github.com/1GYOU1/twitter-reloaded/commit/977e1f880ad6df2b25a0c382faca982fbbe63a64)

참고 사이트 - https://firebase.google.com/docs/auth/web/manage-users?hl=ko

<br>

### #3.5 Github Login

#### 파이어베이스 사용해서 깃허브(GitHub) 로그인 옵션 추가

① Firebase 홈페이지 프로젝트 선택 -> Authentication -> Sign-in method -> 로그인 제공업체 '새 제공업체 추가' 버튼 클릭 -> GitHub 버튼 클릭 -> 사용 설정 Enabel로 변경.

② https://github.com/settings/developers로 이동 -> Register a new application 버튼 클릭하여 새로운 Oauth 앱 생성
- Application name : twitter reloaded
- Homepage URL : 확인하는 게 아니라서 아무거나 넣어도 됨. 웹사이트가 없으니 firebase 링크 사용. 
  - https://twitter-reloaded-42238.firebaseapp.com/
- Application description : 설명 필수 X
- Authorization callback URL : Firebase GitHub 로그인 제공업체 구성 설정을 완료하려면  승인 콜백 URL을 GitHub 앱 구성에 추가하라는 코드 복사 붙여넣기.
  - 예시 : https://twitter-reloaded-42238.firebaseapp.com/__/auth/handler

③ Firebase GithHub 제공업체 구성 작성
  - 클라이언트 ID 작성 : 깃허브에 생성한 앱 기반으로 작성 
    - 예시 : 9037bca346d91120ef1f
  - 클라이언트 보안 비밀번호 작성 : 깃허브 Client secrets 우측 Generate a new client secret 버튼 클릭, 깃허브 비밀번호 입력 후 secret 키 생성. 
    - 한번만 보여주고, 까먹으면 재생성 필요함. 절대 다른 누구에게도 노출되면 XXX !
  - Firebase GitHub 제공업체 구성 작성 완료, 저장 버튼 클릭

④ 깃허브 로그인 적용 코드 작성
  - [commit 내용 참조 1](https://github.com/1GYOU1/twitter-reloaded/commit/edca4d503e7fba815945c7621b1bc937dfd585ac)

![스크린샷 2023-12-06 오후 11 58 16](https://github.com/1GYOU1/twitter-reloaded/assets/90018379/11be75a3-600c-4fc0-82ab-e39bce1bda8e)

<br>

### #3.6 Recap

- [복습 commit 내용 참조](https://github.com/1GYOU1/twitter-reloaded/commit/41d2bccaaf55c8ad325aa3642f4b9d87fd21dfd2)

<br>

## Chapter 4 - TWEETING

