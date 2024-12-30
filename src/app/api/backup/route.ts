import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { bucket } from "@/config/firebase.config";
import { getAllMembersProfile } from "@/backend/members";

export async function POST() {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().replace(/[:.]/g, "-");
    const dirName = `C:/Users/Shawkat Hossain/Desktop/NBC_Backup_${formattedDate}`;
    const picturesDir = path.join(dirName, "pictures");

    if (!fs.existsSync(picturesDir)) {
      fs.mkdirSync(picturesDir, { recursive: true });
    }

    const [files] = await bucket.getFiles({ prefix: "profile_" });

    for (const file of files) {
      const [metadata] = await file.getMetadata();
      const contentType = metadata.contentType;

      let extension = "";
      if (contentType) {
        switch (contentType) {
          case "image/jpeg":
            extension = ".jpg";
            break;
          case "image/png":
            extension = ".png";
            break;
          case "image/gif":
            extension = ".gif";
            break;
          case "image/webp":
            extension = ".webp";
            break;
          default:
            extension = ".bin";
        }
      }

      const fileName = path.basename(file.name) + extension;
      const localFilePath = path.join(picturesDir, fileName);

      await file.download({ destination: localFilePath });
      console.log(`Downloaded and saved file: ${fileName}`);
    }

    const allProfiles = JSON.stringify(await getAllMembersProfile(), null, 2);
    const jsonFilePath = path.join(dirName, "members_data.json");

    fs.writeFileSync(jsonFilePath, allProfiles);
    console.log(`Saved members data to ${jsonFilePath}`);

    return NextResponse.json({ message: `Backup saved to ${dirName}` }, { status: 200 });
  } catch (error) {
    console.error("Error during backup:", error);
    return NextResponse.json({ error: "Failed to create backup" }, { status: 500 });
  }
}
