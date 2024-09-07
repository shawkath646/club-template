"use server";
import { db } from "@/firebase.config";
import { DocumentVerificationType, DocumentType } from "@/types";

const verifyDocument = async (docId: string): Promise<DocumentVerificationType> => {
    const docRef = await db.collection("documents").doc(docId).get();

    if (!docRef.exists) {
        return {
            status: false,
            statusText: "Document does not exist!",
        };
    }

    const docInfo = docRef.data() as DocumentType;

    if (docInfo.validTo < new Date()) {
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

    return docCollection.docs.map(doc => doc.data() as DocumentType);
};

export { getAllDocuments, verifyDocument };
