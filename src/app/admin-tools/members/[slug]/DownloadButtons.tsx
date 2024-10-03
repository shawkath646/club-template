"use client";
import Link from "next/link";
import { useState } from "react";
import StylistButton from "@/components/form/StylistButton";
import downloadProfileStatement from "@/backend/downloadProfileStatement";

export default function DownloadButtons({ applicationId, profilePictureUrl }: { applicationId: string; profilePictureUrl: string; }) {

    const [isLoading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
    
        const pdfBuffer = await downloadProfileStatement(applicationId);

        console.log(pdfBuffer);
    
        const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
    
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.hidden = true;
        link.href = url;
        link.download = `profile_statement_${applicationId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center gap-2">
            <Link
                href={profilePictureUrl}
                download
                className="inline-block w-[200px] py-2.5 font-medium text-white dark:text-gray-200 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-green-500 focus:ring-2 focus:ring-offset-2 rounded-lg shadow-md transform hover:scale-105 focus:scale-105 transition-all duration-300 ease-out text-sm"
            >
                Download Profile Picture
            </Link>

            <StylistButton isLoading={isLoading} colorScheme="red" loadingLabel="Generating PDF..." onClick={handleDownload}>
                Download PDF
            </StylistButton>
        </div>
    );
};
