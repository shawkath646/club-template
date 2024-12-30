"use server";
import { cache } from "react";
import { getSession } from "@/backend/auth";
import { db } from "@/config/firebase.config";
import { generateRandomId } from "@/utils/utils.backend";
import { HistoryType } from "@/types";


const getHistory = cache(async (currentPage: number) => {

});

const setHistory = async (setTo: string, message: string) => {

    const session = await getSession();
    const historyId = "HIS" + generateRandomId(4);

    const historyObject: HistoryType = {
        id: historyId,
        setBy: session?.id as string,
        setTo,
        message,
        timestamp: new Date()
    };

    await db.collection("history").doc(historyId).set(historyObject);
};

export { getHistory, setHistory };