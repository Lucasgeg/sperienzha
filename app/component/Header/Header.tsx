"use client";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const { userId } = useAuth();
  return (
    <div className="bg-gradient-to-t from-blue-primary to-white flex justify-center items-center">
      <div className="absolute top-2 right-2">
        {userId && <SignOutButton>Déconnexion</SignOutButton>}
      </div>
      <Image
        src="/logo.png"
        alt="logo Sperienzha"
        width={200}
        height={200}
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
    </div>
  );
};
