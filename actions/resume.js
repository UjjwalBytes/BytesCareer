"use server";

import { db } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

// 🔐 COMMON USER
async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const decoded = verifyToken(token);
  if (!decoded) throw new Error("Invalid token");

  const user = await db.user.findUnique({
    where: { id: decoded.id },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
}

// 💾 SAVE RESUME
export async function saveResume(content) {
  const user = await getCurrentUser();

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

// 📄 GET RESUME
export async function getResume() {
  const user = await getCurrentUser();

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

// 🤖 IMPROVE WITH AI
export async function improveWithAI({ current, type }) {
  const user = await getCurrentUser();

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.

    Current content: "${current}"

    Requirements:
    - Use action verbs
    - Add metrics/results
    - Highlight skills
    - Keep concise
    - Focus on achievements
    - Use industry keywords

    Return only the improved paragraph.
  `;

  try {
    const result = await model.generateContent(prompt);
    const improvedContent = result.response.text().trim();

    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}