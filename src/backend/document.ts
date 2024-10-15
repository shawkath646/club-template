"use server";
import { cache } from "react";
import { db } from "@/config/firebase.config";
import { DocumentVerificationType, DocumentType } from "@/types";
import { timestampToDate } from "../utils/utils.backend";

const verifyDocument = cache(async (docId: string): Promise<DocumentVerificationType> => {
    const docSnapshot = await db.collection("documents").doc(docId).get();

    if (!docSnapshot.exists) {
        return {
            status: false,
            statusText: "Document does not exist!",
        };
    }

    const docInfoAll = docSnapshot.data() as DocumentType;

    const { id, issuedBy, issuedOn, issuedTo, status, validTo, title, verifiable } = docInfoAll;

    const validToDate = timestampToDate(validTo);
    const issuedOnDate = timestampToDate(issuedOn);

    const docInfo = { id, issuedBy, issuedOn: issuedOnDate, issuedTo, status, validTo: validToDate, title };

    if (!verifiable) {
        return {
            status: false,
            statusText: "Document is not verifiable",
        };
    }

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
});


interface GetDocumentsOptions {
    query?: string;
    lastDocId?: string;
}

const getAllDocuments = cache(async (options: GetDocumentsOptions = {}): Promise<DocumentType[]> => {
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
        docData.issuedOn = timestampToDate(docData.issuedOn) ;
        docData.validTo = timestampToDate(docData.validTo) ;
        return docData;
    });
});

export { getAllDocuments, verifyDocument };
