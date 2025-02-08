"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import StylistButton from "@/components/form/StylistButton";
import InputField from "@/components/form/InputField";
import { rejectBlogPost } from "@/backend/blogPosts";



export default function RejectButton({ docId }: { docId: string; }) {

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [rejectionReason, setRejectionReason] = useState("");

    const router = useRouter();

    const handlePostReject = () => startTransition(async () => {
        const response = await rejectBlogPost(docId,  rejectionReason);

        if (response.success) {
            setRejectionReason("");
            setDialogOpen(false);
            router.push("/admin-tools/blogs");
        };
    });

    return (
        <>
            <StylistButton size="sm" colorScheme="red" onClick={() => setDialogOpen(true)}>Reject</StylistButton>
            <Dialog as="div" open={isDialogOpen} onClose={() => { }}>
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <DialogPanel transition className="w-full max-w-lg rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Post Rejection Confirmation
                        </DialogTitle>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Are you sure you want to reject this blog post? Only reject it if it violates our terms and services. Rejecting this blog will remove it permanently.
                        </p>
                        <InputField label="Reason" value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} />
                        <div className="mt-3 flex items-center justify-end gap-5">
                            <StylistButton size="sm" colorScheme="blue" onClick={() => setDialogOpen(false)} isDisabled={isPending}>Dismiss</StylistButton>
                            <StylistButton size="sm" colorScheme="red" onClick={handlePostReject} isLoading={isPending} isDisabled={rejectionReason.length < 4}>Confirm</StylistButton>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};
