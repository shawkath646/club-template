"use server";
import { cache } from "react";
import { auth } from "@/config/auth.config";
import { db } from "@/config/firebase.config";
import { generateRandomId } from "@/utils/utils.backend";
import { HistoryType } from "@/types";


const getHistory = cache(async (currentPage: number) => {

});

const setHistory = async (setTo: string, message: string) => {

    const session = await auth();
    const historyId = "HIS" + generateRandomId(4);

    const historyObject: HistoryType = {
        id: historyId,
        setBy: session?.user.id as string,
        setTo,
        message,
        timestamp: new Date()
    };

    await db.collection("history").doc(historyId).set(historyObject);
};

export { getHistory, setHistory };