import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "No user" }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = generateToken(user);

  const response = NextResponse.json({ success: true });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}