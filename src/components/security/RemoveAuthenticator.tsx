"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import StylistButton from "../form/StylistButton";
import { removeAuthenticator } from "@/backend/auth";
import { MdDelete } from "react-icons/md";


export default function RemoveAuthenticator() {

    const [showConfirmContainer, setShowConfirmContainer] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleRemoveAuthenticator = () => startTransition(async () => {
        await removeAuthenticator();
        router.refresh();
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <span className="text-blue-500">Enabled</span>
                {!showConfirmContainer && (
                    <button
                        type="button"
                        onClick={() => setShowConfirmContainer(true)}
                        className="text-red-500 hover:text-red-600 transition-colors disabled:text-red-200"
                    >
                        <MdDelete size={18} />
                    </button>
                )}
            </div>

            {showConfirmContainer && (
                <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Are you sure you want to remove the authenticator app from your account? You will no longer be able to access your account using this method.
                    </p>
                    <div className="flex items-center space-x-2">
                        <StylistButton
                            size="sm"
                            colorScheme="green"
                            onClick={() => setShowConfirmContainer(false)}
                            isDisabled={isPending}
                        >
                            Dismiss
                        </StylistButton>
                        <StylistButton
                            size="sm"
                            colorScheme="red"
                            onClick={handleRemoveAuthenticator}
                            isLoading={isPending}
                        >
                            Remove
                        </StylistButton>
                    </div>
                </div>
            )}
        </div>
    );
}