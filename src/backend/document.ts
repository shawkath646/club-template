"use server";
import { db } from "@/firebase.config";
import { DocumentVerificationType, DocumentType } from "@/types";
import { timestampToDate } from "./utils.backend";

const verifyDocument = async (docId: string): Promise<DocumentVerificationType> => {
    const docSnapshot = await db.collection("documents").doc(docId).get();

    if (!docSnapshot.exists) {
        return {
            status: false,
            statusText: "Document does not exist!",
        };
    }

    const docInfoAll = docSnapshot.data() as DocumentType;

    const { id, issuedBy, issuedOn, issuedTo, status, validTo, title } = docInfoAll;

    const validToDate = timestampToDate(validTo) as Date;
    const issuedOnDate = timestampToDate(issuedOn) as Date;

    const docInfo = { id, issuedBy, issuedOn: issuedOnDate, issuedTo, status, validTo: validToDate, title };

    if (validToDate < new Date()) {
        return {
            status: false,
            statusText: "Document expired",
            docInfo,
        };
    }

    return {
        status: true,
        statusText: "Document verified",
        docInfo,
    };
};


interface GetDocumentsOptions {
    query?: string;
    lastDocId?: string;
}

const getAllDocuments = async (options: GetDocumentsOptions = {}): Promise<DocumentType[]> => {
    const { query, lastDocId } = options;

    let collectionQuery = db.collection("documents").orderBy("addedDate").limit(10);

    if (query) {
        collectionQuery = collectionQuery.where("scope", "==", query);
    }

    if (lastDocId) {
        const lastDocRef = await db.collection("documents").doc(lastDocId).get();
        if (lastDocRef.exists) {
            collectionQuery = collectionQuery.startAfter(lastDocRef);
        }
    }

    const docCollection = await collectionQuery.get();

    return docCollection.docs.map(doc => {
        const docData = doc.data() as DocumentType;
        docData.issuedOn = timestampToDate(docData.issuedOn) as Date;
        docData.validTo = timestampToDate(docData.validTo) as Date;
        return docData;
    });
};

export { getAllDocuments, verifyDocument };
