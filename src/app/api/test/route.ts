import { storage } from "@/config/firebase.config";
import { NextResponse } from "next/server";

export async function GET() {

  // const fileName = "picture_YYazznq7mrW3CxCC2I1x";

  // const fileRef = storage.bucket().file(fileName)

  // const [fileExists] = await fileRef.exists();

  // if (!fileExists) return NextResponse.json({ message: "File not found" }, { status: 404 });

  // //await fileRef.rename("picture_xwnV6XZKPRa6421qdK9y");

  // const [downloadLink] = await fileRef.getSignedUrl({
  //   action: 'read',
  //   expires: '01-01-2074',
  // });


  return NextResponse.json({ message: "Hi! This is test api" }, { status: 200 });
}
