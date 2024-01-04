import { SignIn, auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { WelcomeForm } from "../component/WelcomeForm/WelcomeForm";

export default async function Welcome() {
  const { userId } = auth();
  if (!userId) return;
  const user = await prisma.user.findUnique({
    where: { clerk_id: userId },
    select: { email: true },
  });

  return (
    <div className="text-center mt-1 px-5">
      <h1 className="text-4xl">Bienvenue sur Spérienzha</h1>
      <p>
        Maintenant que tu es inscrit, merci de compléter ces quelques
        informations afin que nous puissons t&apos;aider à trouver ton tuteur
      </p>
      <WelcomeForm email={user?.email} />
    </div>
  );
}
