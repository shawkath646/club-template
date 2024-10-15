"use client";
import { useState } from "react";
import StylistButton from "@/components/form/StylistButton";
import profilePDFTemplate from "@/templates/profilePDF.template";

export default function PDFDownloadButton({ applicationId }: { applicationId: string; }) {

    const [isLoading, setLoading] = useState(false);

    const handlePDFDownload = async () => {
        setLoading(true);
        const pdfTemplate = await profilePDFTemplate(applicationId);
        const newTab = window.open();
        if (newTab) {
            newTab.document.write(pdfTemplate);
            newTab.document.close();
            newTab.onload = () => newTab.print();
        };
        setLoading(false);
    };

    return (
        <StylistButton isLoading={isLoading} colorScheme="red" loadingLabel="Generating PDF..." onClick={handlePDFDownload}>
            Download PDF
        </StylistButton>
    );
}