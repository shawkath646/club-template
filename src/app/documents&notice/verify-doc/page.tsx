import DocumentVerifyClient from "@/app/documents&notice/verify-doc/DocumentVerifyClient";
import { verifyDocument } from "@/backend/document";
import { DocumentVerificationType, PagePropsType } from "@/types";

export default async function Page({ searchParams }: PagePropsType) {
    const paramsDocId = Array.isArray(searchParams.docId) ? searchParams.docId[0] : searchParams.docId;

    const defaultPageData: DocumentVerificationType = paramsDocId ? await verifyDocument(paramsDocId) : {};

    return <DocumentVerifyClient defaultPageData={defaultPageData} defaultDocId={paramsDocId} />;
}