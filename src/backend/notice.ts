"use server";
import { cache } from "react";
import { db } from "@/config/firebase.config";
import uploadFileToFirestore from "./uploadFileToFirestore";
import { generateRandomId, timestampToDate } from "@/utils/utils.backend";
import { NoticeFormType, NoticeType, PartialFields } from "@/types";
import { setHistory } from "./history";

const getNotices = cache(async (pageNumber: number) => {
    const snapshot = await db
        .collection("notices")
        .orderBy("timestamp", "desc")
        .limit(12)
        .offset((pageNumber - 1) * 12)
        .get();

    return snapshot.docs.map(doc => {
        const data = doc.data() as NoticeType;
        data.timestamp = timestampToDate(data.timestamp);
        return data;
    });
});

const setNotice = async (formdData: NoticeFormType) => {

    const docId = "NOT" + generateRandomId(6);

    const noticeObject: PartialFields<NoticeType, "seenBy"> = {
        id: docId,
        title: formdData.title,
        description: formdData.description,
        timestamp: new Date(),
        isImportant: formdData.isImportant,
        attachment: formdData.attachment ? await uploadFileToFirestore(formdData.attachment as string, { fileType: "document", fileName: `notice_${docId}` }) : ""
    };

    await db.collection("notices").doc(docId).set(noticeObject);
    await setHistory(docId, "[setBy] added notice with ID [setTo]");

    return {
        status: true,
        id: docId
    };
};

export {
    getNotices,
    setNotice
};