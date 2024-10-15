import fs from "fs";
import path from "path";
import uploadFileToFirestore from "@/backend/uploadFileToFirestore";
import { NextResponse } from "next/server";
import { generateNbcId } from "@/utils/utils.backend";
import { MemberProfileType } from "@/types";
import { db, bucket } from "@/config/firebase.config";

export async function POST() {

  // const today = new Date();
  // const expireOn = new Date(today.setFullYear(today.getFullYear() + 50));

  // const filePath = path.join("C:/Users/Shawkat Hossain/Downloads", `club_logo`);

  // const fileBuffer = fs.readFileSync(filePath);

  // const base64Image = Buffer.from(fileBuffer).toString('base64');

  // const mimeType = "image/png"; 

  // const base64ImageData = `data:${mimeType};base64,${base64Image}`;

  // const downloadUrl = await uploadFileToFirestore(base64ImageData, {
  //   fileType: "image",
  //   fileName: "club_logo"
  // });

  // return NextResponse.json({ downloadUrl }, { status: 200 });


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
};
