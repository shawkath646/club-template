"use client";
import { useState } from "react";
import StylistButton from "@/components/form/StylistButton";
import { downloadProfilePicture } from "@/backend/members";

export default function ProfilePictureDownloadButton({ applicationId }: { applicationId: string; }) {

    const [isLoading, setLoading] = useState(false);

    const handleImageDownload = async () => {
        setLoading(true);
        const base64Image = await downloadProfilePicture(applicationId);
        const blob = new Blob([Uint8Array.from(atob(base64Image), c => c.charCodeAt(0))], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `profile_${applicationId}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setLoading(false);
    };

    return (
        <StylistButton colorScheme="green" isLoading={isLoading} onClick={handleImageDownload} className="text-sm">
            Download Profile Picture
        </StylistButton>
    );
};
