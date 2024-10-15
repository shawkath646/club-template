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

    const [isConfirmDialog, setConfirmDialog] = useState(false);
    const [statusChangeTo, setStatusChangeTo] = useState<MemberProfileType["club"]["status"]>(currentStatus);


    return (
        <>
            <section className="mt-10 flex items-center justify-end space-x-3">
                {(currentStatus === "pending" || currentStatus === "suspended" || currentStatus === "rejected") && (
                    <StylistButton colorScheme="green" size="md" onClick={() => { setStatusChangeTo("approved"); setConfirmDialog(true); }}>Approve</StylistButton>
                )}
                {(currentStatus === "pending") && (
                    <StylistButton colorScheme="red" size="md" onClick={() => { setStatusChangeTo("rejected"); setConfirmDialog(true); }}>Reject</StylistButton>
                )}
                {(currentStatus === "approved") && (
                    <StylistButton colorScheme="yellow" size="md" onClick={() => { setStatusChangeTo("suspended"); setConfirmDialog(true); }}>Suspend</StylistButton>
                )}
            </section>
            <ConfirmDialog
                clubInfo={clubInfo}
                currentStatus={currentStatus}
                docId={docId}
                position={position}
                specialNote={specialNote}
                statusChangeTo={statusChangeTo}
                isConfirmDialog={isConfirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
};
