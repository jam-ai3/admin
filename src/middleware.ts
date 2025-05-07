import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyToken } from "./lib/auth";
import db from "./db/db";
import { MAIN_SITE_URL } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(process.env.JWT_KEY!);
  const decoded = await verifyToken(token?.value ?? "");

  if (!decoded) return NextResponse.redirect(new URL(MAIN_SITE_URL, req.url));

  const user = await db.user.findUnique({ where: { id: decoded.id ?? "" } });
  if (user === null)
    return NextResponse.redirect(new URL(MAIN_SITE_URL, req.url));

  const newToken = await signToken({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  req.cookies.set(process.env.JWT_KEY!, newToken);

  if (!user.isAdmin)
    return NextResponse.redirect(new URL(MAIN_SITE_URL, req.url));

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/", "/document/:path*"],
// };
