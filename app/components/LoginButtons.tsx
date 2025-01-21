"use client";

import { signIn } from "next-auth/react";

export default function LoginButtons() {
  return (
    <div>
      <button onClick={() => signIn("google")}>Google 로그인</button>
      <button onClick={() => signIn("kakao")}>Kakao 로그인</button>
      <button onClick={() => signIn("naver")}>Naver 로그인</button>
    </div>
  );
}
