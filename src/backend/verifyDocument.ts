"use server";
import { DocumentVerifyClientType } from "@/types/customTypes";

const verifyDocument = async (docId: string): Promise<DocumentVerifyClientType> => {

    const today = new Date();
    const validTo = new Date(today);
    validTo.setFullYear(today.getFullYear() + 10);

    return {
        status: false,
        statusText: "Document does not exist!",
    };
};

export default verifyDocument;