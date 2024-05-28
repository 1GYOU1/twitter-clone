import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  /* 
    Protected Route는 firebase에게 로그인한 사용자가 누구인지 물어보는 route
    만약 로그인되지 않았다면, 사용자가 Protected route의 하위 페이지를 못 보게 막고있음.
    (로그인 사용자 전용 화면에 접근 X)
    <Layout> 로 이동 X.
  */
  const user = auth.currentUser;// 이걸로 로그인 사용자의 정보를 얻을 수 있음.
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}