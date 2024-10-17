"use client";
import { useState } from "react";
import StylistButton from "@/components/form/StylistButton";
import { MemberProfileType, ClubInfoType } from "@/types";
import ConfirmDialog from "./ConfirmDialog";

export default function ButtonContainer({
    docId,
    clubInfo,
    specialNote,
    position,
    currentStatus
}: {
    docId: string;
    clubInfo: ClubInfoType;
    specialNote?: string,
    position: string;
    currentStatus: MemberProfileType["club"]["status"]
}) {

    const [dialogState, setDialogState] = useState<{ isOpen: boolean; changeStatus: MemberProfileType["club"]["status"] }>({
        isOpen: false,
        changeStatus: currentStatus
    });

    return (
        <>
            <section className="mt-10 flex items-center justify-end space-x-3">
                {(currentStatus === "pending" || currentStatus === "suspended" || currentStatus === "rejected") && (
                    <StylistButton colorScheme="green" size="md" onClick={() => setDialogState({ isOpen: true, changeStatus: "approved" })}>Approve</StylistButton>
                )}
                {(currentStatus === "pending") && (
                    <StylistButton colorScheme="red" size="md" onClick={() => setDialogState({ isOpen: true, changeStatus: "rejected" })}>Reject</StylistButton>
                )}
                {(currentStatus === "approved") && (
                    <StylistButton colorScheme="yellow" size="md" onClick={() => setDialogState({ isOpen: true, changeStatus: "suspended" })}>Suspend</StylistButton>
                )}
            </section>
            <ConfirmDialog
                clubInfo={clubInfo}
                docId={docId}
                position={position}
                specialNote={specialNote}
                dialogState={dialogState}
                setDialogState={setDialogState}
            />
        </>
    );
};
