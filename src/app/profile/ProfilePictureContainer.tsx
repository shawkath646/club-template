"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useTransition } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import StylistButton from "@/components/form/StylistButton";
import FileUpload from "@/components/form/FileUpload";
import { changeProfilePicture } from "@/backend/members";

export default function ProfilePictureContainer({
    pictureUrl,
    memberFullName,
}: {
    pictureUrl: string;
    memberFullName: string;
}) {
    const [isShowDialog, setShowDialog] = useState(false);
    const [newProfilePicture, setNewProfilePicture] = useState<string>("");
    const [errorText, setErrorText] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleProfilePictureChange = () => startTransition(async () => {
        if (!newProfilePicture) setErrorText("Invalid profile picture selected");
        await changeProfilePicture(newProfilePicture);
        setNewProfilePicture("");
        router.refresh();
        setErrorText("");
        setShowDialog(false);
    });

    return (
        <>
            <button
                type="button"
                onClick={() => setShowDialog(true)}
                className="relative inline-block group overflow-hidden rounded-full mx-auto"
            >
                <Image
                    src={pictureUrl}
                    alt={`${memberFullName}'s profile`}
                    height={80}
                    width={80}
                    className="h-[80px] w-[80px] transition-opacity duration-300 ease-in-out group-hover:opacity-50 border-2 border-yellow-400 p-1 rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 group-hover:bg-opacity-30 dark:bg-white dark:group-hover:bg-opacity-30 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 dark:text-black transition-opacity duration-300 ease-in-out">
                        Change
                    </span>
                </div>
            </button>

            <Dialog
                open={isShowDialog}
                onClose={() => { }}
                className="relative z-10 text-white dark:text-gray-200"
            >
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-lg rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out">
                        <DialogTitle className="font-medium text-lg text-white dark:text-gray-200 mb-8">
                            Change Profile Picture
                        </DialogTitle>

                        <div className="mb-8 space-y-4">
                            <Image
                                src={pictureUrl}
                                alt={`${memberFullName}'s profile`}
                                height={150}
                                width={150}
                                className="h-[150px] w-[150px] rounded mx-auto object-cover"
                            />
                            {newProfilePicture ? (
                                <Image
                                    src={newProfilePicture}
                                    alt={`${memberFullName}'s updated profile`}
                                    height={150}
                                    width={150}
                                    className="h-[150px] w-[150px] rounded mx-auto object-cover"
                                />
                            ) : (
                                <div className="h-[150px] w-[150px] rounded bg-gray-200 dark:bg-gray-700 mx-auto flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                                    Preview
                                </div>
                            )}
                            <FileUpload
                                label="Upload here"
                                type="image"
                                field={{
                                    name: "newPicture",
                                    onBlur: () => { },
                                    onChange: setNewProfilePicture,
                                    ref: () => { },
                                    value: newProfilePicture,
                                }}
                                setError={setErrorText}
                                isBase64
                                error={{ type: "validate", message: errorText }}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <StylistButton
                                onClick={() => setShowDialog(false)}
                                size="sm"
                                colorScheme="red"
                                isDisabled={isPending}
                                className="w-[23%]"
                            >
                                Dismiss
                            </StylistButton>
                            <StylistButton
                                onClick={handleProfilePictureChange}
                                size="sm"
                                colorScheme="blue"
                                isLoading={isPending}
                                isDisabled={!newProfilePicture}
                                className="w-[75%]"
                            >
                                Change
                            </StylistButton>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
