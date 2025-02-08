"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useQRCode } from "next-qrcode";
import RemoveAuthenticator from "./RemoveAuthenticator";
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import { addAuthenticatorSecretKey, getAuthenticatorSecretKey } from "@/backend/auth";

interface AuthenticatorDataType {
    tempSessionId: string;
    authQRURL: string;
    secretKey: string;
}

export default function SetupAuthenticator({ isAuthenticatorEnabled }: { isAuthenticatorEnabled: boolean }) {
    const [authenticatorData, setAuthenticatorData] = useState<AuthenticatorDataType | null>(null);
    const [authCode, setAuthCode] = useState("");
    const [errorText, setErrorText] = useState("");
    const [isPending, startTransition] = useTransition();
    const { Canvas } = useQRCode();
    const router = useRouter();

    const setupAuthenticator = () => startTransition(async () => {
        const data = await getAuthenticatorSecretKey();
        setAuthenticatorData(data);
    });

    const submitAuthenticatorToken = async () => {
        setErrorText("");
        if (!authenticatorData?.tempSessionId) {
            setErrorText("Temporary session ID is missing.");
            return;
        }

        const response = await addAuthenticatorSecretKey(authenticatorData.tempSessionId, authCode);

        if (response.success) {
            router.refresh();
            setAuthenticatorData(null);
        }
        else setErrorText(response.message);
    };

    return (
        <div>
            <div className="flex space-x-2">
                <p className="text-sm text-gray-800 dark:text-gray-300">Authenticator:</p>
                {isAuthenticatorEnabled ? (
                    <RemoveAuthenticator />
                ) : !authenticatorData && (
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={setupAuthenticator}
                        className="ml-2 text-blue-500 hover:text-blue-600 disabled:text-blue-300 transition-colors"
                    >
                        {isPending ? "Please wait..." : "Setup"}
                    </button>
                )}
            </div>

            {authenticatorData && (
                <div className="mt-4 space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Download an authenticator app such as Google Authenticator or Microsoft Authenticator, and scan the QR code below:
                    </p>

                    <div className="flex justify-center mt-2">
                        <Canvas
                            text={authenticatorData.authQRURL}
                            options={{
                                errorCorrectionLevel: "M",
                                margin: 3,
                                scale: 4,
                                width: 200,
                                color: {
                                    dark: "#000",
                                    light: "#FFF",
                                },
                            }}
                        />
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Or manually enter this key into your authenticator app:
                    </p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {authenticatorData.secretKey}
                    </p>

                    <div className="flex items-end gap-2">
                        <InputField
                            label="Enter code from authenticator"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                        />
                        <StylistButton
                            size="sm"
                            colorScheme="green"
                            onClick={submitAuthenticatorToken}
                            isDisabled={authCode.length !== 6}
                        >
                            Submit
                        </StylistButton>
                    </div>
                    {errorText && (
                        <p className="mt-1 text-red-500 text-sm">{errorText}</p>
                    )}
                </div>
            )}
        </div>
    );
}
