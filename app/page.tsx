"use client";
import { useRouter } from "next/navigation";

import LoginButtons from "./components/LoginButtons";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <main>
        <h1>OAuth 로그인 예제</h1>
        <LoginButtons />
        <button onClick={() => router.push("/map")}>지도로!</button>
      </main>
    </div>
  );
}
