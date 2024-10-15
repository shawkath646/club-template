import { Metadata } from "next";
import Link from "next/link";
import NoItemFound from "@/components/NoItemFound";
import { getAllDocuments } from "@/backend/document";
import { DocumentType } from "@/types";
import { formatDate } from "@/utils/utils.frontend";
import { FaArrowRightLong } from "react-icons/fa6";


export const metadata: Metadata = {
    title: "Documents & Notice"
};


export default async function Page() {

    const documentsProfile: DocumentType[] = await getAllDocuments({ query: "profile" });
    const documentsPublic: DocumentType[] = await getAllDocuments({ query: "public" });
    const documentsMembers: DocumentType[] = await getAllDocuments({ query: "members" });

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-500 bg-opacity-20 mb-8 py-5 px-3 rounded space-y-4 sm:space-y-0 sm:space-x-4">
                <h1 className="text-2xl sm:text-3xl font-semibold text-blue-500 dark:text-blue-400">
                    Documents
                </h1>
                <Link
                    href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/documents&notice/verify-doc`}
                    className="inline-flex items-center space-x-2 sm:space-x-3 px-4 py-2 sm:px-6 sm:py-2.5 bg-blue-500 text-white font-medium text-xs sm:text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700 dark:active:bg-blue-800"
                >
                    <p>Verify Document</p>
                    <FaArrowRightLong size={16} />
                </Link>
            </div>

            {!!documentsPublic.length && (
                <section>
                    <h2 className="text-2xl font-medium mb-4">Public Documents</h2>
                    <DocumentList documents={documentsPublic} />
                </section>
            )}

            {!!documentsMembers.length && (
                <section className="mb-12">
                    <h2 className="text-2xl font-medium mb-4">Members Documents</h2>
                    <DocumentList documents={documentsMembers} />
                </section>
            )}

            {!!documentsProfile.length && (
                <section className="mb-12">
                    <h2 className="text-2xl font-medium mb-4">Individual Profile Documents</h2>
                    <DocumentList documents={documentsProfile} />
                </section>
            )}

            {!(documentsProfile.length && documentsPublic.length && documentsMembers.length) && <NoItemFound label="documents" />}
        </>
    );
}


function DocumentList({ documents }: { documents: DocumentType[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                <thead className="bg-blue-500 dark:bg-blue-700 text-white">
                    <tr>
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Format</th>
                        <th className="py-2 px-4">Document Name</th>
                        <th className="py-2 px-4">File Name</th>
                        <th className="py-2 px-4">Added Date</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr key={doc.id} className="border-b dark:border-gray-700">
                            <td className="py-2 px-4 text-center">{index + 1}</td>
                            <td className="py-2 px-4 text-center">
                                <IconForDocFormat format={doc.format} />
                            </td>
                            <td className="py-2 px-4">{doc.title}</td>
                            <td className="py-2 px-4">{doc.fileName}</td>
                            <td className="py-2 px-4">{formatDate(doc.issuedOn)}</td>
                            <td className="py-2 px-4 text-center">
                                <Link href={doc.downloadLink} download className="text-blue-500 hover:underline dark:text-blue-400">Download</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function IconForDocFormat({ format }: { format: string }) {
    switch (format) {
        case "pdf":
            return <i className="fas fa-file-pdf text-red-500"></i>;
        case "doc":
        case "docx":
            return <i className="fas fa-file-word text-blue-500"></i>;
        case "xlsx":
            return <i className="fas fa-file-excel text-green-500"></i>;
        default:
            return <i className="fas fa-file text-gray-500"></i>;
    }
}
