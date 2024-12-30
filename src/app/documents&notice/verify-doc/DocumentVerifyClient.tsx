"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import { verifyDocument } from "@/backend/document";
import { formatDate } from "@/utils/utils.frontend";
import { ClubInfoType, DocumentVerificationType } from "@/types";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";


export default function DocumentVerifyClient({ clubInfo, defaultPageData, defaultDocId }: { clubInfo: ClubInfoType; defaultPageData: DocumentVerificationType; defaultDocId?: string }) {

    const [pageData, setPageData] = useState<DocumentVerificationType>(defaultPageData);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ docId: string }>({ defaultValues: { docId: defaultDocId } });

    const onSubmit: SubmitHandler<{ docId: string }> = async (data) => {
        try {
            const newPageData = await verifyDocument(data.docId);
            setPageData(newPageData);
        } catch (error) {
            console.error('Error verifying document:', error);
        }
    };

    return (
        <>
            <section className="grid lg:grid-cols-2 gap-5">
                <div>
                    <div className="py-6 px-4 bg-blue-100 dark:bg-gray-800 rounded-lg shadow-md mt-10 max-w-md">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center gap-3">
                            <InputField label="Enter Document ID" {...register("docId", { required: { value: true, message: "Document ID not provided!" }, minLength: { value: 7, message: "Minimum 7 characters is required!" }, maxLength: { value: 15, message: "Maximum 15 characters is allowed!" } })} placeholder="e.g., 123456789" />
                            <StylistButton type="submit" colorScheme="blue" loadingLabel="Verifying..." isLoading={isSubmitting} size="md">Verify</StylistButton>
                        </form>
                        {errors.docId && <p className="mt-2 text-xs text-red-500 dark:text-red-400">{errors.docId.message}</p>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 my-5 max-w-[400px]">
                        Note: The document verification ID can be found at the top right corner beside the QR code on documents issued by {clubInfo.name}. Alternatively, scanning the QR code will automatically redirect you to the verification page.
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
        </>
    );
};
