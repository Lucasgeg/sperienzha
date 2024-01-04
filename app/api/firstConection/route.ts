import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type PostRequest = {
  id: string;
};

export async function POST(req: Request) {
  const data: PostRequest = await req.json();
  const { id } = data;
  try {
    const data = await prisma.user.findUnique({
      where: {
        clerk_id: id,
      },
      select: {
        first_connection: true,
      },
    });
    if (data) {
      return NextResponse.json(
        { first_connection: data.first_connection },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
