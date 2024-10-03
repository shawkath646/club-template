import uploadFileToFirestore from "@/backend/uploadFileToFirestore";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { generateNbcId } from "@/backend/utils.backend";
import { MemberProfileType } from "@/types";
import { db, storage } from "@/config/firebase.config";

export async function POST() {
  // const filePath = path.join("C:/Users/Shawkat Hossain/Downloads", "picture_uOShSDZ3dOHT6lh5MlB6");

  // const fileBuffer = fs.readFileSync(filePath);

  // const base64Image = Buffer.from(fileBuffer).toString('base64');

  // const mimeType = "image/jpeg"; 

  // const base64ImageData = `data:${mimeType};base64,${base64Image}`;

  // const downloadUrl = await uploadFileToFirestore(base64ImageData, {
  //   fileName: "picture_uOShSDZ3dOHT6lh5MlB6",
  //   fileType: "image",
  // });

  // return NextResponse.json({ downloadUrl }, { status: 200 });

  // const today = new Date();
  // const expireOn = new Date(today.setFullYear(today.getFullYear() + 50));

  // const fileRef = storage.bucket().file("profile_2410022QM9");


  // const [downloadURL] = await fileRef.getSignedUrl({
  //   action: "read",
  //   expires: expireOn,
  // });




  // const docs = await db.collection("members").where("club.status", "==", "pending").get();
  // for (const doc of docs.docs) {
  //   const docId = doc.id;

  //   const [signedUrl] = await storage.bucket().file(`profile_${docId}`).getSignedUrl({
  //     action: 'read',
  //     expires: expireOn
  //   });

  //   await doc.ref.set({ personal: { picture: signedUrl } }, { merge: true });

  //   console.log(`Done ${docId}`);
  // }



  // const members = await getMembersProfile();

  // const updatePromises = members.members.map(async (item, index) => {

  //   const newNbcId = (item.club.status === "approved") ? 100000 + index : 0;

  //   const oldNbcId = item.club.nbcId
  //   item.club.nbcId = newNbcId;

  //   await db.collection("members").doc(item.id).set(item);

  //   console.log(`${index + 1}. Changed ${oldNbcId} --> ${newNbcId}`);

  // });

  // await Promise.all(updatePromises);

  return NextResponse.json({ message: `Action done.` }, { status: 200 });



  // const dirName = "C:/Users/Shawkat Hossain/Desktop/NBC Backup/profile";

  // if (!fs.existsSync(dirName)) {
  //   fs.mkdirSync(dirName, { recursive: true });
  // }

  // const [files] = await storage.bucket().getFiles({ prefix: 'profile_' });

  // for (const file of files) {
  //   const [metadata] = await file.getMetadata();
  //   const contentType = metadata.contentType;

  //   let extension = '';
  //   if (contentType) {
  //     switch (contentType) {
  //       case 'image/jpeg':
  //         extension = '.jpg';
  //         break;
  //       case 'image/png':
  //         extension = '.png';
  //         break;
  //       case 'image/gif':
  //         extension = '.gif';
  //         break;
  //       case 'image/webp':
  //         extension = '.webp';
  //         break;
  //       default:
  //         extension = '.bin';
  //     }
  //   }

  //   const fileName = file.name + extension;
  //   const localFilePath = path.join(dirName, fileName);

  //   await file.download({ destination: localFilePath });

  //   console.log(`Downloaded file: ${fileName}`);
  // }

  // return NextResponse.json({ message: `Action done. backup saved to ${dirName}` }, { status: 200 });
}
