"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { DialogStateType, ClubInfoType } from "@/types";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import StylistButton from "@/components/form/StylistButton";

interface SubmittingDialogType {
    dialogState: DialogStateType;
    setDialogState: Dispatch<SetStateAction<DialogStateType>>;
    clubInfo: ClubInfoType;
}

export default function SubmittingDialog({ clubInfo, dialogState, setDialogState }: SubmittingDialogType) {

    const [isURLCopied, setURLCopied] = useState(false);

    const router = useRouter();

    const onDialogDismiss = () => {
        setURLCopied(false);
        setDialogState({ isOpen: false, status: "initial", message: "" });
        router.refresh();
    };

    const onNoticeURLCopy = async () => {
        const noticeURL = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/documents&notice-board?select=${dialogState.message}`;
        await navigator.clipboard.writeText(noticeURL);
        setURLCopied(true);
    };

    return (
        <Dialog open={dialogState.isOpen} onClose={() => { }} className="relative z-10">
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-all text-center">

                    <div className="flex items-center justify-center mb-8 space-x-2">
                        <Image
                            src={clubInfo.logo}
                            height={48}
                            width={48}
                            alt={`${clubInfo.name} Logo`}
                            className="w-10 h-10 md:w-12 md:h-12"
                        />
                        <h3 className="text-lg lg:text-xl text-gray-800 dark:text-gray-200">
                            {clubInfo.name}
                        </h3>
                    </div>

                    <div className="flex flex-shrink-0 items-center justify-center space-x-3 mb-5">
                        {dialogState.status === "success" && (
                            <>
                                <FaCheck size={32} className="text-green-500 h-8 w-8" />
                                <p className="font-medium lg:text-lg text-black dark:text-gray-200">
                                    Notice added successfully
                                </p>
                            </>
                        )}
                        {dialogState.status === "loading" && (
                            <>
                                <FaSpinner size={32} className="text-blue-500 animate-spin h-8 w-8" />
                                <p className="font-medium lg:text-lg text-black dark:text-gray-200">
                                    Adding notice...
                                </p>
                            </>
                        )}
                        {dialogState.status === "failed" && (
                            <>
                                <RxCross1 size={32} className="text-red-500 flex-shrink-0" />
                                <p className="font-medium lg:text-lg text-black dark:text-gray-200">
                                    {dialogState.message}
                                </p>
                            </>
                        )}
                    </div>

                    {isURLCopied && <p className="text-green-500 text-sm">URL copied to clipboard</p>}

                    <div className="flex items-center gap-3 justify-center mt-10 mb-5">
                        {(dialogState.status !== "loading") && (
                            <StylistButton colorScheme="green" onClick={onDialogDismiss}>Dismiss</StylistButton>
                        )}
                        {(dialogState.status === "success") && (
                            <StylistButton colorScheme="blue" onClick={onNoticeURLCopy}>Copy Link</StylistButton>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};
