"use client";
import { RedirectToSignIn, SignIn, useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = useAuth();
  if (!userId) return <RedirectToSignIn />;
  return <div className="">Hello Spérienzha</div>;
}
