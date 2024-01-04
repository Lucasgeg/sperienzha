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
  } = data;

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

    if (data) {
      return NextResponse.json({ test: "bravo" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
