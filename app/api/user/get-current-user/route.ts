import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }
  try {
    const data = await prisma.user.findUnique({
      where: {
        clerk_id: userId,
      },
    });
    if (data) {
      return NextResponse.json({ ...data }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
