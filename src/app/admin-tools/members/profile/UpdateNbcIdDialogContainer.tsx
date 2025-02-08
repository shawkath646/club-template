"use client";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import { updateMemberNbcId } from "@/backend/members";

interface UpdateNbcIdDialogType {
    docId: string;
    setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function UpdateNbcIdDialogContainer({ docId, setDialogOpen }: UpdateNbcIdDialogType) {

    const [newNbcId, setNewNbcId] = useState("");
    const [errorText, setErrorText] = useState("");
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleNbcIdUpdate = () => startTransition(async () => {
        setErrorText("");
        const response = await updateMemberNbcId(docId, Number(newNbcId));

        if (response.success) {
            router.refresh();
            setDialogOpen(false);
        } else {
            setErrorText(response.message);
        }
    });

    return (
        <>
            <InputField
                type="number"
                label="New NBC ID"
                value={newNbcId}
                onChange={e => setNewNbcId(e.target.value)}
            />
            {errorText && <p className="mt-3 text-sm text-red-500">{errorText}</p>}
            <div className="flex items-center justify-end gap-2 mt-5">
                <StylistButton onClick={() => setDialogOpen(false)} size="sm" colorScheme="red" isDisabled={isPending}>Dismiss</StylistButton>
                <StylistButton onClick={handleNbcIdUpdate} size="sm" colorScheme="blue" isLoading={isPending} isDisabled={newNbcId.length < 4}>Update</StylistButton>
            </div>
        </>
    );
};
