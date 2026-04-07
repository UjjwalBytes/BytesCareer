"use server";

import { db } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

// 🔐 GET USER FROM JWT
async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const decoded = verifyToken(token);

  if (!decoded) throw new Error("Invalid token");

  const user = await db.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) throw new Error("User not found");

  return user;
}

// ✅ UPDATE USER
export async function updateUser(data) {
  const user = await getCurrentUser();

  try {
    const result = await db.$transaction(async (tx) => {
      let industryInsight = await tx.industryInsight.findUnique({
        where: {
          industry: data.industry,
        },
      });

      if (!industryInsight) {
        const insights = await generateAIInsights(data.industry);

        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            ...insights,
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      }

      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };
    });

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw new Error("Failed to update profile");
  }
}

// ✅ ONBOARDING STATUS
export async function getUserOnboardingStatus() {
  const user = await getCurrentUser();

  return {
    isOnboarded: !!user?.industry,
  };
}

// ✅ TEST
export async function test() {
  const user = await db.test.create({
    data: {
      user: "atahar",
    },
  });

  return {
    user,
  };
}