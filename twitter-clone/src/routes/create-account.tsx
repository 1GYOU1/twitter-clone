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