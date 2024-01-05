"use client";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="w-full pb-1">
      <div className="flex w-[50vw] justify-around font-bold">
        <button
          type="submit"
          className="bg-white text-blue-primary px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            router.push("/");
          }}
        >
          Accueil
        </button>
        <button
          type="submit"
          className="bg-white text-blue-primary px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            router.push("/tutor-research");
          }}
        >
          Recherche
        </button>
        <button
          type="submit"
          className="bg-white text-blue-primary px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            router.push("/message");
          }}
        >
          Messages
        </button>
        <button
          type="submit"
          className="bg-white text-blue-primary px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => {
            router.push("/profile");
          }}
        >
          Profil
        </button>
      </div>
    </nav>
  );
};
