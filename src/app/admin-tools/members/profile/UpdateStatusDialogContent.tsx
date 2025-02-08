"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import StylistButton from "@/components/form/StylistButton";
import InputField from "@/components/form/InputField";
import { updateMemberStatus } from "@/backend/members";
import joiningFormOptions from "@/constant/joiningFormOptions.json";
import { MemberProfileType } from "@/types";


interface UpdateStatusDialogType {
    docId: string;
    defaultStatus: MemberProfileType["club"]["status"];
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateStatusDialogContent({ defaultStatus, docId, setDialogOpen }: UpdateStatusDialogType) {

    const [selectedStatus, setSelectedStatus] = useState<MemberProfileType["club"]["status"]>(defaultStatus);
    const [specialNote, setSpecialNote] = useState("");
    const [isLoading, startTransition] = useTransition();

    const router = useRouter();

    const handleStatusUpdate = () => startTransition(async () => {
        await updateMemberStatus(docId, { status: selectedStatus, specialNote });
        router.refresh();
    });

    return (
        <div className="w-full max-w-md mb-1">
            <RadioGroup
                value={selectedStatus}
                onChange={setSelectedStatus}
                aria-label="Update status"
                className="flex gap-4 flex-wrap items-center mb-5"
            >
                {joiningFormOptions.status.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                        <Radio
                            value={option}
                            className={({ checked }) =>
                                `group flex items-center justify-center w-5 h-5 rounded-full border-2 ${checked
                                    ? "bg-blue-500 border-blue-500"
                                    : "border-gray-400 dark:border-gray-600 bg-white/20 dark:bg-gray-800/20"
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out`
                            }
                        >
                            <span className={`invisible w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400 ${option === selectedStatus ? "visible" : ""}`} />
                        </Radio>
                        <label className="text-gray-900 dark:text-gray-300 text-sm font-medium hover:text-blue-500 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                    </div>
                ))}
            </RadioGroup>

            <InputField
                label="Special Note"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
            />

            <div className="flex items-center justify-end gap-3 mt-8">
                <StylistButton
                    colorScheme="red"
                    isDisabled={isLoading}
                    onClick={() => setDialogOpen(false)}
                    size="sm"
                >
                    Dismiss
                </StylistButton>
                <StylistButton
                    colorScheme="blue"
                    isLoading={isLoading}
                    onClick={handleStatusUpdate}
                    loadingLabel="Updating..."
                    size="sm"
                    className="px-8 w-auto"
                >
                    Update Status
                </StylistButton>
            </div>
        </div>
    );
}
