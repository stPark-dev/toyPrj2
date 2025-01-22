"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import LoginButtons from "./components/LoginButtons";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div>
      <main>
        <h1>OAuth 로그인 예제</h1>
        {status === "authenticated" && session?.user ? (
          <div>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="프로필 이미지"
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />
            )}
            <p>안녕하세요, {session.user.name || "사용자"}님!</p>
            <button className="btn btn-primary" onClick={() => signOut()}>
              로그아웃
            </button>
          </div>
        ) : (
          <LoginButtons />
        )}
        {session ? (
          <button className="btn btn-primary" onClick={() => router.push("/map")}>
            지도로!
          </button>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}
