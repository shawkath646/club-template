"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import StylistButton from "@/components/form/StylistButton";
import { updateMemberPosition } from "@/backend/members";
import { capitalizeWords } from "@/utils/utils.frontend";
import joiningFormOptions from "@/constant/joiningFormOptions.json";
import { RxCross1 } from "react-icons/rx";

interface UpdatePositionDialogType {
    docId: string;
    defaultPosition: string[];
    setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function UpdatePositionDialogContent({ docId, defaultPosition, setDialogOpen }: UpdatePositionDialogType) {

    const [currentPosition, setCurrentPosition] = useState<string[]>(defaultPosition);
    const [isLoading, startTransition] = useTransition();

    const router = useRouter();

    const handlePositionUpdate = () => startTransition(async () => {
        const response = await updateMemberPosition(docId, currentPosition);
        if (response.success) {
            router.refresh();
            setDialogOpen(false);
        };
    });

    return (
        <>
            <div className="flex flex-wrap gap-2 mb-4">
                {currentPosition.map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() =>
                            setCurrentPosition((prev) => prev.filter((e) => e !== item))
                        }
                        className="text-yellow-500 bg-yellow-500/20 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:bg-yellow-500 hover:text-white flex items-center gap-2"
                    >
                        <p>{capitalizeWords(item)}</p>
                        <RxCross1 />
                    </button>
                ))}
            </div>

            <select
                aria-label="Select a position"
                onChange={(e) =>
                    setCurrentPosition((prev) => [...prev, e.target.value])
                }
                defaultValue="default"
                className="mb-6 block w-full bg-transparent px-3 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
            >
                <option value="default" disabled>--- Select Option ---</option>
                {joiningFormOptions.positions.map((option, index) => (
                    <option key={index} value={option} className="text-black dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                        {capitalizeWords(option)}
                    </option>
                ))}
            </select>

            <div className="flex items-center justify-end gap-3">
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
                    onClick={handlePositionUpdate}
                    loadingLabel="Updating..."
                    size="sm"
                    className="px-8 w-auto"
                >
                    Update Position
                </StylistButton>
            </div>
        </>
    );
}