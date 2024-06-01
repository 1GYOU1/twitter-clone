## 트위터 클론코딩 [2023 UPDATE]

Firebase를 사용하여 authentication(인증), firestore, storage, hosting,
application deploy(배포),
이메일과 비밀번호로 로그인, GitHub 계정 로그인, 트윗 보내기, 편집, 삭제, 이미지 첨부,
유저의 친구들, 보냈던 트윗 등을 profile에서 볼 수 있는 application

<!-- 2024-05-27 ~  -->

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

## Chapter 1 - INTRODUCTION

### #1.2 What is Firebase

### [ firebase ]
- 백엔드 서버 서비스 혹은 앱 개발 플랫폼으로 볼 수 있다.
- 애플리케이션을 만들거나, 웹사이트를 만들 때 시간 절약을 할 수 있음.
- https://console.firebase.google.com/u/0/?hl=ko

#### Cloud Firestore
- 글로벌 규모의 모바일 및 웹 앱용 데이터를 쉽게 저장, 동기화, 쿼리할 수 있게 해주는 NoSQL 문서 데이터베이스
- https://firebase.google.com/products/firestore?hl=ko

#### Auth
- 이메일/비밀번호 계정, 전화 인증, Google, Twitter, Facebook, GitHub 로그인 등을 지원하는 엔드 투 엔드 ID 솔루션 제공
- https://firebase.google.com/products/auth?hl=ko

#### Cloud Storage
- 사진, 동영상 등의 사용자 제작 콘텐츠를 빠르고 손쉽게 저장하고 제공할 수 있도록 설계되었습니다.
- https://firebase.google.com/products/storage?hl=ko


<br>

## Chapter 2 - SETUP

### #2.0 Installation

[commit history](https://github.com/1GYOU1/twitter-reloaded/commit/7c1c73213a71d93d46b8c3df41156a8861330921)

create react app 과 Vite 사용은 결과가 같으나 해당 프로젝트에서는 Vite 사용 !
- Vite - https://ko.vitejs.dev/

<br>

① [Vite - Guide](https://vitejs.dev/guide/) - 세팅 시작 !

>$ npm create vite@latest

② 엔터를 누르면 vite의 최신 버전을 설치하겠냐고 묻는 프롬프트가 나옴 -> yes 선택

create-vite@4.4.1

>$ Ok to proceed? (y) 

③ 프로젝트 명 입력

>$ Project name: … twitter-clone

④ 프레임워크 선택 - React

>$ ✔ Select a framework: › React

⑤ Typescript or Javascript 사용 선택

SWC -> Rust typescript 컴파일러

>$ ✔ Select a variant: › TypeScript + SWC

⑥ 프로젝트 폴더 진입

>$ cd twitter-clone

⑦ npm install

>$ npm i

⑧ 제대로 작동하는지 확인 

>$ npm run dev

➈ 파일 정리하기
- twitter-clone/src/index.css 삭제 
- twitter-clone/src/App.css 삭제
- twitter-clone/src/assets 폴더 삭제
- twitter-clone/src/main.tsx 
  - 최상단 import './index.css' 구문 삭제
- twitter-clone/src/App.tsx 코드 정리
```tsx
// twitter-clone/src/App.tsx
function App() {

  return (
    <>
    </>
  )
}

export default App
```

- index.html - 웹 사이트 title 변경, logo 삭제

![스크린샷 2024-05-27 오후 11 04 34](https://github.com/1GYOU1/twitter-reloaded/assets/90018379/d9ad920c-0e3a-49fc-b1a8-7075075dd520)


```html
<!-- twitter-clone/index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- <link rel="icon" type="image/svg+xml" href="/vite.svg" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Twitter clone</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

➉ 추가 기능 설치
>$ npm i react-router-dom@6.14.2

>$ npm i styled-reset

>$ npm i styled-components@6.0.7

>$ npm i types styled components -D

<br>

### #2.1 Routing

[commit history](https://github.com/1GYOU1/twitter-reloaded/commit/fc19cb00b084d7c593e17428676d6d475af35e7c)

#### React-router-dom 
- https://reactrouter.com/en/main/start/overview#client-side-routing

#### &lt;Outlet> 
- https://reactrouter.com/en/main/components/outlet
- 하위 경로 요소를 렌더링하기 위해 상위 경로 요소에서 Outlet을 사용해야 합니다. 이를 통해 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있습니다.
- 하단 소스 &lt;layout> 공통 컴포넌트에서 &lt;Outlet> 사용하여 루트에 따른 자식 컴포넌트 노출.

```js
// twitter-clone/src/App.tsx

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
    element: <Layout />,//하단 페이지에서의 공통 include 파일. 모든 경로와 맞아떨어지게 되어있는 구조.
    children: [
      {
        /*
          http://localhost:5173
          layout과 Home 노출
        */
        path: "",
        element: <Home />,
      },
      {
        /*
          http://localhost:5173/profile
          layout과 Profile 노출
          Outlet이 Profile이라는 component에 대체되어서 나타남
        */
        path: "profile",
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
```js
// twitter-clone/src/components/layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}
```

<br>

### #1.2 LoadingScreen

[commit history](https://github.com/1GYOU1/twitter-reloaded/commit/de4ce5ac9564cf1ea112429a5c44b0da72b11062)

#### 파이어베이스 authentication에 필요한 간단한 로직 구현하기
- firebase authentication 작동 방식 - 얘네가 필요한 쿠키, 토큰 등을 담당함.
  - firebase SDK
  - firebase server

- 사용자가 애플리케이션에 들어오면 firebase SDK는 잠시동안 사용자의 로그인 여부를 확인할 시간이 필요함.
  - 쿠키와 토큰을 가져와서 서버와 함께 확인해줌 (로그인 여부 체크하고 firebase에서 유저 정보 가져올 동안 로딩 화면 필요)
- 유저인증에 관한 작업은 전부 firebase가 해줌.
- firebase sdk가 로그인 유무, 유저정보를 보낼 때 까지 보여줄 loading screen 만들기
- 특별히 sdk의 작업종료를 확인할 필요 없음. 2초간 화면을 가려줄 Loading 컴포넌트를 만들기

<br>

```js
// twitter-clone/src/App.tsx
...
function App() {

  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    
    // wait for firebase 로그인 사용자 관련 작업 예정 영역
    
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

https://firebase.google.com/?hl=ko

① firebase 홈페이지에 로그인 후, 새 프로젝트 생성하기 버튼 클릭

![스크린샷 2024-05-31 오후 10 22 41](https://github.com/1GYOU1/twitter-clone/assets/90018379/9bee9d39-4522-41e6-b625-d125d9cd5ec1)

② 프로젝트 이름 정하기 - twitter-clone

![스크린샷 2024-05-31 오후 10 23 34](https://github.com/1GYOU1/twitter-clone/assets/90018379/f6403fe0-d9e7-49ed-a05a-70371207278f)


③ Google Analytics 
  - 강의에선 비활성화했으나, 해도 상관 X ! 했다가 나중에 취소했움,,,

![스크린샷 2024-05-31 오후 10 23 41](https://github.com/1GYOU1/twitter-clone/assets/90018379/918a6f73-37d5-475b-8a73-c5fc3e673f6f)
![스크린샷 2024-05-31 오후 10 24 15](https://github.com/1GYOU1/twitter-clone/assets/90018379/71aaefd2-80ba-4d26-a313-579a6f8d370d)


④ continue 버튼 클릭하고, web 아이콘 클릭

![6](https://github.com/1GYOU1/twitter-clone/assets/90018379/e851b91d-eff6-4055-8e00-3b5ce1ba7182)

⑤ app 이름 정하기 - web

![스크린샷 2024-05-31 오후 10 34 07](https://github.com/1GYOU1/twitter-clone/assets/90018379/e229937c-9c2d-4b3d-8fc7-c0383715843f)


⑥ set up Firebase Hosting 체크 해제

⑦ Firebase를 우리의 API key로 초기화 하기 위해 하단 명령어 입력.

- 강의와 같은 버전 사용을 위해 하단 명령어 사용

>$ npm install firebase@10.1.0

![스크린샷 2024-05-31 오후 10 34 27](https://github.com/1GYOU1/twitter-clone/assets/90018379/c1a1d271-d436-4e00-952f-9d5350af1988)

⑧ 하단 파일 생성하여 firebase 페이지에 나타나는 하단 코드 복사 붙여넣기.
- 주석 제거하고 정리해도 됨 ~!

```ts

//twitter-clone/src/firebase.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

<br>

## Chapter 3 - AUTHENTICATION

### #3.0 Setup

#### 파이어베이스 사용해서 로그인 페이지, 회원가입 페이지 구현 셋업
- Firebase 애플리케이션을 만들면 모든 제품이 기본적으로 비활성화 되어있음.
- 처음에 모두 활성화되어있으면 정신 없어서 원하는 걸 하나씩 활성화 시켜주는 형태이다.

#### [ `Authentication` ] 활성화

① 하단 파이어베이스 페이지에서 내 프로젝트를 선택 -> `Build` -> `Authentication` 클릭 -> 시작하기 버튼 클릭
- https://console.firebase.google.com/

![스크린샷-2024-05-31-오후-10 51 47](https://github.com/1GYOU1/twitter-clone/assets/90018379/0c8f91bc-7506-4f81-be94-682be3198f62)

![3](https://github.com/1GYOU1/twitter-clone/assets/90018379/73c4234d-80d9-4bb5-b0f4-e6dedfdcc2cf)

② 로그인 방법을 추가하여 Firebase 인증 시작하기 - 이메일/비밀번호 선택 > 활성화

![2](https://github.com/1GYOU1/twitter-clone/assets/90018379/cc9f0ada-05b5-4448-8243-235c93c20254)

![1](https://github.com/1GYOU1/twitter-clone/assets/90018379/be26bcb9-de80-4894-8f8a-b299b0833d77)


![스크린샷 2024-05-31 오후 10 55 47](https://github.com/1GYOU1/twitter-clone/assets/90018379/50c70290-94c9-45c8-a7d2-bd527674aa16)

사용자 탭은 아직 비어있지만 추후에 회원가입 하면 여기에 리스트가 생길 예정 !
![스크린샷 2024-05-31 오후 10 56 06](https://github.com/1GYOU1/twitter-clone/assets/90018379/ad2bf2a9-1ee2-43e1-b028-ca486c36242f)

③ firebase.ts 수정
- authentication 사용을 원한다는 코드 작성해주기

```ts
// twitter-clone/src/firebase.ts

import { getAuth } from "firebase/auth";
/*
  ... 생략
  최상단, 최하단 코드 추가하기
*/
export const auth = getAuth(app);// app에 대한 인증 서비스를 사용
```

④ App.tsx 수정
- 사용자 인증 상태가 준비되었는지 기다리는 코드 추가
- Firebase가 쿠키과 토큰을 읽고 백엔드와 소통해서 로그인여부를 확인하는 동안 기다리겠다는 뜻. 

```tsx
// twitter-clone/src/App.tsx
//...
function App() {

  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    /* 
    초기 인증 상태가 해결되면 즉시 resolve되는 promise을 반환합니다. promise가 확인되면 현재 사용자는 유효한 사용자이거나 사용자가 로그아웃한 경우 null 일 수 있습니다.

    Auth.currentUser
    현재 로그인한 사용자(또는 null)입니다.

    Auth.signOut()
    현재 사용자를 로그아웃합니다. 이것은 사용자의 ID 토큰을 자동으로 취소하지 않습니다.

    Auth.onAuthStateChanged()
    사용자의 로그인 상태 변경에 대한 관찰자를 추가합니다.
    */
    await auth.authStateReady();//여기서 사용자가 로그인했는지 안했는지, 누구인지에 대한 정보를 기다림.
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
//...
```

<br>

 ### #3.1 Forms and UI

css로 계정 생성 페이지 만들기 ! 
- style-conpoments

```tsx
// twitter-clone/src/routes/create-account.tsx

import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubButton from "../components/github-btn";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    // input에 작성하면 state에 데이터 입력
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
        target: { name, value },
        } = e;
        if (name === "name") {
        setName(value);
        } else if (name === "email") {
        setEmail(value);
        } else if (name === "password") {
        setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // console.log(name, email, password)
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
        setLoading(true);
        /* 
          이름, 이메일, 비밀번호 작성을 완료하면 해당 하단 함수를 호출해서 간단하게 계정 생성
          사용자가 생성된 후에는 해당 사용자에 대한 자격증명을 받아와야함.
        */
        const credentials = await createUserWithEmailAndPassword(
          auth,// Auth 인스턴스
          email,
          password
        );
        // console.log(credentials.user);
        /* 
          사용자의 프로필 즉시 업데이트
          Firebase 인증에는 사용자 프로필에 표시될 이름(display name)과 아바타 URL 설정 가능.
        */
        await updateProfile(credentials.user, {
          displayName: name,
        });
        navigate("/");// index 페이지로 이동 -> <Home />
    } catch (e) {
      // setError
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
    return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
```


<br>

[사용법은 commit 내용 참조](https://github.com/1GYOU1/twitter-reloaded/commit/977e1f880ad6df2b25a0c382faca982fbbe63a64)

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



<br>
<br>
<br>

github-pages 배포시 createBrowserRouter 문제 참고

https://velog.io/@eunji9128/gh-pages-%EB%B0%B0%ED%8F%AC-%EC%8B%9C-URL-%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8%EC%A7%81%EC%A0%91-%EC%9E%85%EB%A0%A5-%EB%AC%B8%EC%A0%9C