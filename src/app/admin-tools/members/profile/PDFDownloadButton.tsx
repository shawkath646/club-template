"use client";
import { useState } from "react";
import StylistButton from "@/components/form/StylistButton";
import { downloadProfilePDF } from "@/backend/downloadActions";

export default function PDFDownloadButton({ applicationId }: { applicationId: string; }) {

    const [isLoading, setLoading] = useState(false);

    const handlePDFDownload = async () => {
        setLoading(true);

        const pdfBuffer = await downloadProfilePDF(applicationId);

        const blob = new Blob([new Uint8Array(pdfBuffer).buffer]);

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
        <StylistButton isLoading={isLoading} colorScheme="red" loadingLabel="Generating PDF..." onClick={handlePDFDownload}>
            Download PDF
        </StylistButton>
    );
}