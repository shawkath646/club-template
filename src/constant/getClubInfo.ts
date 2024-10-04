"use server";
import { cache } from "react";
import { db } from "@/config/firebase.config";
import { timestampToDate } from "@/backend/utils.backend";
import { ClubInfoType } from "@/types";

const getClubInfo = cache(async () => {
  const applicationInfoDoc = await db.collection("metadata").doc("clubInfo").get();
  const clubInfo = applicationInfoDoc.data() as ClubInfoType;
  clubInfo.establishedOn = timestampToDate(clubInfo.establishedOn) as Date;
  return clubInfo;
});

export default getClubInfo;