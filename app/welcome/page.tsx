import { RedirectToSignIn, auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { WelcomeForm } from "../component/WelcomeForm/WelcomeForm";

export default async function Welcome() {
  const { userId } = auth();
  if (!userId) return <RedirectToSignIn />;

  const user = await prisma.user.findUnique({
    where: { clerk_id: userId },
    select: { email: true },
  });

  return (
    <div className="text-center mt-1 px-5">
      {user?.email && <WelcomeForm email={user.email} />}
    </div>
  );
}
