import React from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

/*
    깃허브 로그인 옵션 추가 컴포넌트
    firebase 홈페이지에서 활성화하고, GitHub 애플리케이션 만들어야함. (reademe 참고)

*/

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
        const provider = new GithubAuthProvider();
        /* 
            만약 트위터, 구글 로그인 옵션 추가하고 싶다면 하단 방식 코드 입력
            const tp = new TwitterAuthProvider();
        */

        // 팝업 or 리디렉션으로 깃허브 로그인 
        await signInWithPopup(auth, provider);
        navigate("/");
        /*
            만약 비밀번호 재설정 화면 노출하고 싶다면
            sendPasswordResetEmail 사용해서 이메일로 인증코드를 보내고,
            메일에서 인증하기를 누르면 비밀번호 재설정하는 화면이 노출됨.
            해당 화면은 커스텀 할 수 없음.
        */
    } catch (error) {
        console.error(error);
    }
  };
  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      Continue with Github
    </Button>
  );
}