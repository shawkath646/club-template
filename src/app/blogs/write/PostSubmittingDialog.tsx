"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ClubInfoType, DialogStateType } from "@/types";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";

interface SubmittingDialogType {
    dialogState: DialogStateType;
    setDialogState: Dispatch<SetStateAction<DialogStateType>>;
    clubInfo: ClubInfoType;
}

export default function PostSubmittingDialog({ clubInfo, dialogState, setDialogState }: SubmittingDialogType) {
    return (
        <Dialog open={dialogState.isOpen} onClose={() => { }} className="relative z-10 text-white dark:text-gray-200">
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel transition className="w-full max-w-lg rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                    <div className="flex items-center justify-center mb-8 space-x-2">
                        <Image
                            src={clubInfo.logo}
                            height={48}
                            width={48}
                            alt={`${clubInfo.name} Logo`}
                            className="w-10 h-10 md:w-12 md:h-12"
                        />
                        <DialogTitle className="text-lg lg:text-xl">
                            {clubInfo.name}
                        </DialogTitle>
                    </div>

                    <div className="flex flex-shrink-0 items-center justify-center space-x-3">
                        {dialogState.status === "success" && (
                            <FaCheck size={32} className="text-green-500 h-8 w-8" />
                        )}
                        {dialogState.status === "loading" && (
                            <FaSpinner size={32} className="text-blue-500 animate-spin h-8 w-8" />
                        )}
                        {dialogState.status === "failed" && (
                            <RxCross1 size={32} className="text-red-500 flex-shrink-0" />
                        )}
                        <p className="font-medium lg:text-lg">
                            {dialogState.message}
                        </p>
                    </div>

                    {(dialogState.status === "loading" || dialogState.status === "success") && (
                        <p className="text-sm md:text-base mt-8 text-center">
                            Thank you for submitting your blog post! We believe your post will help others discover new facts and information. One of our admins will review and publish it soon. You can check the status on the
                            <Link href="/my-blogs" className="mx-2 text-blue-500 hover:text-blue-600 transition-all">My Blogs</Link>
                            page, and once it's published, we encourage you to share it on social media.
                        </p>
                    )}

                    {dialogState.status === "failed" && (
                        <button
                            type="button"
                            onClick={() => setDialogState({ ...dialogState, isOpen: false })}
                            className="px-6 py-2 mt-10 block w-[150px] mx-auto text-sm md:text-base font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Got it
                        </button>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
};
