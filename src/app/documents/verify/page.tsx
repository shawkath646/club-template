import { DocumentVerifyClientType, PagePropsType } from "@/types/customTypes";
import DocumentVerifyClient from "@/components/documentVerify/DocumentVerifyClient";
import verifyDocument from "@/backend/verifyDocument";

export default async function Page({ searchParams }: PagePropsType) {
    const paramsDocId = Array.isArray(searchParams.docId) ? searchParams.docId[0] : searchParams.docId;

    const defaultPageData: DocumentVerifyClientType = paramsDocId ? await verifyDocument(paramsDocId) : {};

    return <DocumentVerifyClient defaultPageData={defaultPageData} />;
}