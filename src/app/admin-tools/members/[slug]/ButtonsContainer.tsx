"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StylistButton from "@/components/form/StylistButton";
import { updateStatus } from "@/backend/members";


export default function ButtonContainer({ docId, status }: { docId: string; status: string; }) {

    const [isLoading, setLoading] = useState(false);

    const router = useRouter();

    const changeStatus = async(status: string) => {
        setLoading(true);
        await updateStatus(docId, status);
        setLoading(false);
        router.push(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members`);
    };

    return (
        <section className="mt-10 flex items-center justify-end space-x-3">
            {(status === "pending" || status === "suspended" || status === "rejected") && (
                <StylistButton colorScheme="green" size="md" onClick={() => changeStatus("approved")} isLoading={isLoading}>Approve</StylistButton>
            )}
            {(status === "pending") && (
                <StylistButton colorScheme="red" size="md" onClick={() => changeStatus("rejected")} isLoading={isLoading}>Reject</StylistButton>
            )}
            {(status === "approved") && (
                <StylistButton colorScheme="yellow" size="md" onClick={() => changeStatus("suspended")} isLoading={isLoading}>Suspend</StylistButton>
            )}
        </section>

    );
}