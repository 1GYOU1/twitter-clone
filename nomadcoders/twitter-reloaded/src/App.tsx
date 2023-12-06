import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,// 로그인이 되면 해당 페이지를 볼 수 있음.
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

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

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {

  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    /* 
    Firebase가 쿠키과 토큰을 읽고 백엔드와 소통해서 로그인여부를 확인하는 동안 기다리겠다는 뜻. 
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

  return (
    <Wrapper>
      <GlobalStyles />
      {/* 사용자가 어떤 상태인지에 따라 router(로그인 화면이나 계정 생성, 홈 화면 등..)로 보냄 */}
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App
