"use client";

import { signIn } from "next-auth/react";

import { SiGoogle, SiKakaotalk, SiNaver } from "react-icons/si";

import { Button } from "@/components/ui/button";

export default function LoginButtons() {
  return (
    <div className="flex mx-4 gap-4">
      <Button className="btn-primary" onClick={() => signIn("google")}>
        <SiGoogle />
        Google 로그인
      </Button>
      <Button className="btn-primary" onClick={() => signIn("kakao")}>
        <SiKakaotalk />
        Kakao 로그인
      </Button>
      <Button className="btn-primary" onClick={() => signIn("naver")}>
        <SiNaver />
        Naver 로그인
      </Button>
    </div>
  );
}
