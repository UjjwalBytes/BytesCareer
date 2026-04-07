import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token);

    if (!decoded) return null;

    const user = await db.user.findUnique({
      where: { id: decoded.id },
    });

    return user;
  } catch (error) {
    console.log("CheckUser Error:", error.message);
    return null;
  }
};