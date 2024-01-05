import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.user.findMany({
      select: {
        nom: true,
        prenom: true,
        email: true,
        photo: true,
      },
      where: {
        first_connection: false,
      },
    });
    if (data) {
      return NextResponse.json({ data }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
