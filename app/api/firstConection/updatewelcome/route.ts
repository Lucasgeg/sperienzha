import { WelcomeForm } from "@/app/component/WelcomeForm/WelcomeForm";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data: Required<WelcomeForm> = await req.json();

  const {
    age,
    description,
    email,
    firstname,
    gender,
    lastname,
    level,
    picture,
    school,
    criteria,
  } = data;
  const userId = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id_user: true,
    },
  });
  if (!userId)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  try {
    const data = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        age: Number(age),
        description,
        email,
        ecole: school,
        prenom: firstname,
        nom: lastname,
        niveau_scolaire: level,
        photo: picture,
        genre: gender,
        first_connection: false,
      },
    });
    const dataCriteria = await prisma.userCritere.createMany({
      data: criteria.map((c) => ({
        critereId: c,
        userId: userId.id_user,
      })),
    });

    if (data && dataCriteria) {
      return NextResponse.redirect("/");
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
