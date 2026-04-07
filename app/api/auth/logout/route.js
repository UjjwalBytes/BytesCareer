import { NextResponse } from "next/server";

export async function GET(req) {
  const response = NextResponse.redirect(
    new URL("/", req.url) // 👈 "/" = home page
  );

  response.headers.set(
    "Set-Cookie",
    "token=; Path=/; HttpOnly; Max-Age=0"
  );

  return response;
}