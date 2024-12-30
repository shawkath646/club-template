import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/backend/auth";
import { oAuth2Client } from "@/backend/secure";
import { db } from "@/config/firebase.config";


export async function GET(request: NextRequest) {
  const session = await getSession();
  if (session?.id !== process.env.DEVELOPER_ID) {
    return NextResponse.json({ status: false, error: "User is not authorized for this action"}, { status: 401 });
  }
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ status: false, error: "Authorization code not provided" }, { status: 400 });
  const { tokens } = await oAuth2Client.getToken(code);
  if (!tokens || !tokens.access_token) {
    return NextResponse.json({ status: false, error: "Failed to retrieve tokens from authorization code" }, { status: 500 });
  }
  await db.collection("metadata").doc("gmail-api-tokens").set(tokens);
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/secure`);
};
