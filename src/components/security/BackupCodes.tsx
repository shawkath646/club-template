"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import StylistButton from "@/components/form/StylistButton";
import { resetBackupCodes } from "@/backend/auth";
import { formatDate } from "@/utils/utils.frontend";


export default function BackupCodes({ savedBackupCodes, backupCodeDownloadHeader }: { savedBackupCodes: string[], backupCodeDownloadHeader: string }) {

    const [isShowCodes, setShowCodes] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handlePasswordReset = () => startTransition(async () => {
        await resetBackupCodes();
        router.refresh();
    });

    const handleCopyCodes = () => {
        const codeString = savedBackupCodes.join(" ");
        navigator.clipboard.writeText(codeString);
        alert("Codes are copied to clipboard");
    };

    const handleDownloadCodes = () => {
        const header = 'Narsingdi Biggan Club account backup codes for two step verification\n';
        const currentTime = `Created on: ${formatDate(new Date(), { isTime: true })}\n\n`;

        const codeChunks = [];
        for (let i = 0; i < savedBackupCodes.length; i += 3) {
            const chunk = savedBackupCodes.slice(i, i + 3).join(" ");
            codeChunks.push(chunk);
        }

        const codeString = header + backupCodeDownloadHeader + currentTime + codeChunks.join("\n");
        const blob = new Blob([codeString], { type: 'text/plain' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `nbc-backup-codes.txt`;

        link.click();
        URL.revokeObjectURL(link.href);
    };


    return (
        <div>
            <p className="text-sm text-gray-800 dark:text-gray-300 mb-3 flex items-center">
                <span>Backup Codes:</span>
                <button
                    type="button"
                    onClick={() => setShowCodes(prev => !prev)}
                    className="text-blue-500 hover:text-blue-600 transition-colors focus:outline-none ml-3">
                    {isShowCodes ? "Hide" : "Show"}
                </button>
            </p>
            {isShowCodes && (
                <>
                    <div className="font-medium text-black dark:text-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {savedBackupCodes.map((item, index) => (
                            <p key={index} className="p-2 text-center">{item}</p>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 my-4">
                        These codes are sensitive and should not be shared with anyone. Store them in a secure place and use them to log in if other methods are unavailable.
                    </p>
                    <div className="flex flex-wrap items-center space-x-3 space-y-3 sm:space-y-0">
                        <StylistButton size="sm" colorScheme="red" onClick={handlePasswordReset} isLoading={isPending}>Reset</StylistButton>
                        <StylistButton size="sm" colorScheme="green" isDisabled={isPending} onClick={handleDownloadCodes}>Download</StylistButton>
                        <StylistButton size="sm" colorScheme="blue" isDisabled={isPending} onClick={handleCopyCodes}>Copy</StylistButton>
                    </div>
                </>
            )}
        </div>
    );
}
