"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Switch } from "@headlessui/react";
import SetupAuthenticator from "./SetupAuthenticator";
import BackupCodes from "./BackupCodes";
import { changeTwoStepStatus } from "@/backend/auth";

export default function TwoStepSecurity({
    isTwoStep,
    twoStepMethods,
    savedBackupCodes,
    backupCodeDownloadHeader
}: {
    isTwoStep: boolean;
    twoStepMethods: {
        emails: string[];
        phones: string[];
        authenticator: boolean;
    };
    savedBackupCodes: string[];
    backupCodeDownloadHeader: string;
}) {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleTwoStepStatus = (value: boolean) => startTransition(async () => {
        await changeTwoStepStatus(value);
        router.refresh();
    });

    return (
        <div className="bg-white/20 dark:bg-black/20 rounded-xl p-8 shadow-xl backdrop-blur-lg space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-white dark:text-gray-300">Two Step Security</p>
                <Switch
                    checked={isTwoStep}
                    disabled={isPending}
                    onChange={handleTwoStepStatus}
                    className={`${isTwoStep ? "bg-teal-900" : "bg-teal-700"} 
                    relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out 
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75  disabled:opacity-50 disabled:bg-gray-300/20
                    ${isTwoStep ? "opacity-100" : "cursor-not-allowed"}`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${isTwoStep ? "translate-x-5" : "translate-x-0"}
                        pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>

            {isTwoStep && (
                <div className="space-y-4">
                    <p className="text-md font-semibold text-gray-800 dark:text-gray-300">Available Methods:</p>
                    <SetupAuthenticator isAuthenticatorEnabled={twoStepMethods.authenticator} />
                    <MethodList title="Emails" items={twoStepMethods.emails} />
                    <MethodList title="Phone Numbers" items={twoStepMethods.phones} />
                    <BackupCodes savedBackupCodes={savedBackupCodes} backupCodeDownloadHeader={backupCodeDownloadHeader} />
                </div>
            )}
        </div>
    );
}


function MethodList({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <p className="text-sm text-gray-800 dark:text-gray-300">{title}:</p>
            <ul className="list-disc list-inside space-y-2">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <li key={index} className="text-sm text-gray-800 dark:text-gray-200">
                            {item}
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No {title.toLowerCase()} added.</p>
                )}
            </ul>
        </div>
    );
}
