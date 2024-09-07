import { NextResponse } from "next/server";
import { storage } from "@/firebase.config";

export async function GET() {

    const fileName = "file_3e724c63-251d-43ab-844e-4011c51cfa68.jpeg";

    const fileRef = storage.bucket().file(fileName);
    if (await fileRef.exists()) await fileRef.delete();
    return NextResponse.json({ status: `${fileName} deleted successfully` }, { status: 200 });
}