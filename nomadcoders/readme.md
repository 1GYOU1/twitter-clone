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

## Chapter 9 - SETUP

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

