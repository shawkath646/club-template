import { NextResponse } from "next/server";

export async function POST() {

  return NextResponse.json({ message: "Test API" }, { status: 200 });
};
