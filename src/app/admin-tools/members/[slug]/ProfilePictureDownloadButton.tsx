"use client";
import { useState } from "react";
import StylistButton from "@/components/form/StylistButton";

export default function ProfilePictureDownloadButton({ applicationId, profilePictureUrl }: { applicationId: string; profilePictureUrl: string; }) {

    const [isLoading, setLoading] = useState(false);

    const handleImageDownload = async () => {
        setLoading(true);
        const link = document.createElement('a');
        link.href = profilePictureUrl;
        link.download = `nbc_profile_${applicationId}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(profilePictureUrl);

        setLoading(false);
    };

    return (
        <StylistButton colorScheme="green" isLoading={isLoading} onClick={handleImageDownload} className="text-sm">
            Download Profile Picture
        </StylistButton>
    );
};
