import { NextResponse } from "next/server";

export async function POST() {

  return NextResponse.json({ message: "Updated successfully" }, { status: 200 });
}
