import { auth } from "../firebase";

export default function Home() {
    const logOut = () => {
        auth.signOut();// 로그아웃
    };
    return (
    <h1>
        {/* 로그아웃 버튼 */}
        <button onClick={logOut}>Log Out</button>
    </h1>
    );
}