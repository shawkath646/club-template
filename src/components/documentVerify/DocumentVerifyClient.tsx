"use client";
import { useRef, useState } from "react";
import verifyDocument from "@/backend/verifyDocument";
import { DocumentVerifyClientType } from "@/types/customTypes";
import formatDate from "@/lib/formatDate";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";
import { ImSpinner8 } from "react-icons/im";



export default function DocumentVerifyClient({ defaultPageData }: { defaultPageData: DocumentVerifyClientType }) {

    const [pageData, setPageData] = useState<DocumentVerifyClientType>(defaultPageData);
    const [isLoading, setLoading] = useState(false);

    const verifyDocInputRef = useRef<HTMLInputElement>(null);

    const verifyDocumentButton = async () => {
        setLoading(true);
        try {
            if (verifyDocInputRef.current) {
                const verifyDocInputValue = verifyDocInputRef.current.value;
                const newPageData = await verifyDocument(verifyDocInputValue);
                setPageData(newPageData);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error verifying document:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[750px] bg-white text-black dark:bg-black dark:text-gray-200 pt-[50px]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section className="grid lg:grid-cols-2 gap-5">
                    <div>
                        <div className="py-6 px-4 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md mt-10 max-w-md">
                            <label
                                htmlFor="doc-verification-id"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                Enter Document ID:
                            </label>
                            <div className="flex flex-col md:flex-row items-center gap-3">
                                <input
                                    id="doc-verification-id"
                                    type="text"
                                    ref={verifyDocInputRef}
                                    defaultValue={pageData?.docInfo?.id}
                                    className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 dark:bg-gray-900 dark:text-gray-300 text-sm w-full"
                                    placeholder="e.g., 123456789"
                                />
                                <button
                                    type="button"
                                    disabled={isLoading}
                                    onClick={verifyDocumentButton}
                                    className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-black shadow-md disabled:bg-gray-400 flex items-center justify-center space-x-2"
                                >
                                    {isLoading && <ImSpinner8 size={16} className="animate-spin" />}
                                    <p>{isLoading ? "Verifying" : "Verify"}</p>
                                </button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 my-5 max-w-[400px]">
                            Note: The document verification ID can be found at the top right corner beside the QR code on documents issued by Narsingdi Biggan Club. Alternatively, scanning the QR code will automatically redirect you to the verification page.
                        </p>
                    </div>
                    {!!pageData.statusText && (
                        <div className={`flex items-center justify-center space-x-2 md:space-x-3 lg:space-x-5 my-auto ${pageData.status ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                            {pageData.status ? (
                                <FaFileCircleCheck size={35} className="h-[25px] lg:h-[35px] w-[25px] lg:w-[35px]" />
                            ) : (
                                <FaExclamationTriangle size={35} className="h-[25px] lg:h-[35px] w-[25px] lg:w-[35px]" />
                            )}
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">{pageData.statusText}</h1>
                        </div>
                    )}
                </section>

                {pageData.docInfo && (
                    <table className="min-w-full mt-5 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Doc ID</th>
                                <td className="px-2 py-4 font-semibold text-gray-500 dark:text-gray-400">:</td>
                                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-semibold">{pageData.docInfo.id}</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                                <td className="px-2 py-4 font-semibold text-gray-500 dark:text-gray-400">:</td>
                                <td className={`px-6 py-4 ${pageData.status ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"} font-semibold`}>{pageData.docInfo.status}</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Document Title</th>
                                <td className="px-2 py-4 font-semibold text-gray-500 dark:text-gray-400">:</td>
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pageData.docInfo.title}</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Issued to</th>
                                <td className="px-2 py-4 font-semibold text-gray-500 dark:text-gray-400">:</td>
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pageData.docInfo.issuedTo}</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Issued By</th>
                                <td className="px-2 py-4 font-semibold text-gray-500 dark:text-gray-400">:</td>
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{pageData.docInfo.issuedBy}</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Issued On</th>
                                <td className="px-2 py-4 font-semibold text-gray-500 dark:text-gray-400">:</td>
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{formatDate(pageData.docInfo.issuedOn)}</td>
                            </tr>
                            <tr>
                                <th className="text-left px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Valid To</th>
                                <td className="px-2 py-4 font-semibold text-gray-500 dark:text-gray-400">:</td>
                                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{formatDate(pageData.docInfo.validTo)}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}