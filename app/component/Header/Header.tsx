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
      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{userId && <SignOutButton>Déconnexion</SignOutButton>}</button>
      </div>
      <Image
        src="/logo.png"
        alt="logo Sperienzha"
        width={536}
        height={200}
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
    </div>
  );
};
