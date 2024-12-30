import DocumentVerifyClient from "@/app/documents&notice/verify-doc/DocumentVerifyClient";
import { verifyDocument } from "@/backend/document";
import getClubInfo from "@/constant/getClubInfo";
import { DocumentVerificationType, PagePropsType } from "@/types";

export default async function Page({ searchParams: searchParamsPromise }: PagePropsType) {
    const searchParams = await searchParamsPromise;
    const paramsDocId = Array.isArray(searchParams.docId) ? searchParams.docId[0] : searchParams.docId;
    const defaultPageData: DocumentVerificationType = paramsDocId ? await verifyDocument(paramsDocId) : {};
    const clubInfo = await getClubInfo();

    return <DocumentVerifyClient defaultPageData={defaultPageData} defaultDocId={paramsDocId} clubInfo={clubInfo} />;
}