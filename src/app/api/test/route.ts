import uploadFileToFirestore from "@/backend/uploadFileToFirestore";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join("C:/Users/Shawkat Hossain/Downloads", "picture_XCH7oGMGpUytmj71rLdl");
  
  const fileBuffer = fs.readFileSync(filePath);
  
  const base64Image = Buffer.from(fileBuffer).toString('base64');
  
  const mimeType = "image/jpeg"; 
  
  const base64ImageData = `data:${mimeType};base64,${base64Image}`;

  const downloadUrl = await uploadFileToFirestore(base64ImageData, {
    fileName: "picture_XCH7oGMGpUytmj71rLdl",
    fileType: "image",
  });

  return NextResponse.json({ downloadUrl }, { status: 200 });
}
