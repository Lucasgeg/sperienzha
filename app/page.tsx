"use client";
import { RedirectToSignIn, SignIn, useAuth } from "@clerk/nextjs";
import { user } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<user>();
  useEffect(() => {
    if (!userId) return;
    const getUser = async () => {
      const res = await fetch(`/api/user/get-current-user`);
      const data = await res.json();
      if (res.status === 200) {
        setUser(data);
      }
    };
    getUser();
  }, [userId]);

  if (!userId) return <RedirectToSignIn />;
  return (
    <div>
      <div className="box1">
        <div className="box2">
          <div className="box3">
            <div
              className="one cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              Profil
            </div>
            <div
              className="two cursor-pointer"
              onClick={() => router.push("/tutor-research")}
            >
              Recherche de tuteur
            </div>
          </div>
          <div className="three h-[50vh] w-[60vw] flex justify-center items-center">
            Bienvenue {user?.prenom} {user?.nom} sur l&apos;application
            Spérienzha!
          </div>
        </div>
        <div
          className="four flex justify-center items-center cursor-pointer"
          onClick={() => router.push("/message")}
        >
          Messagerie
        </div>
      </div>
    </div>
  );
}
