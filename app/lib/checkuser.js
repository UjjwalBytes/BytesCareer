import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { db } from "./prisma";

export async function checkUser() {
  const token = cookies().get("token")?.value;

  if (!token) return null;

  const decoded = verifyToken(token);

  if (!decoded) return null;

  const user = await db.user.findUnique({
    where: { id: decoded.id },
  });

  return user;
}