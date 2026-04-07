import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password, name } = await req.json();

  const existing = await db.user.findUnique({
    where: { email },
  });

  if (existing) {
    return Response.json({ error: "User exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: { email, password: hashed, name },
  });

  const token = generateToken(user);

  return Response.json({ user, token });
}