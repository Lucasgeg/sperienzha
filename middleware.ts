import { authMiddleware, auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/api/webhook(.*)"],

  afterAuth: async (auth, req) => {
    const userId = auth.userId;
    const url = req.nextUrl.clone();

    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }

    const res = await fetch("/api/firstConection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    const result = await res.json();
    if (result.first_connection === false) {
      return NextResponse.next();
    }
    if (result.first_connection === true) {
      if (url.pathname.startsWith("/api/firstConection")) {
        return NextResponse.next();
      }
      url.pathname = "/welcome";
      return NextResponse.rewrite(url);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
