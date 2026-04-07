"use server";

import { db } from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

// 🔐 COMMON USER FETCH
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

// 🤖 AI INSIGHTS
export const generateAIInsights = async (industry) => {
  const prompt = `
    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format:
    {
      "salaryRanges": [
        { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
      ],
      "growthRate": number,
      "demandLevel": "High" | "Medium" | "Low",
      "topSkills": ["skill1", "skill2"],
      "marketOutlook": "Positive" | "Neutral" | "Negative",
      "keyTrends": ["trend1", "trend2"],
      "recommendedSkills": ["skill1", "skill2"]
    }
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText);
};

// 📊 GET INSIGHTS
export async function getIndustryInsights() {
  const user = await getCurrentUser();

  // agar insights already hai
  if (user.industryInsight) {
    return user.industryInsight;
  }

  // warna generate karo
  const insights = await generateAIInsights(user.industry);

  const industryInsight = await db.industryInsight.create({
    data: {
      industry: user.industry,
      ...insights,
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return industryInsight;
}