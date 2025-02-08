"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import StylistButton from "@/components/form/StylistButton";
import { approveBlogPost } from "@/backend/blogPosts";

export default function PublishButton({ docId }: { docId: string; }) {

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handlePostPublish = () => startTransition(async () => {
        const response = await approveBlogPost(docId);
        
        if (response.success) {
            setDialogOpen(false);
            router.push("/admin-tools/blogs");
        };
    });

    return (
        <>
            <StylistButton size="sm" colorScheme="green" onClick={() => setDialogOpen(true)}>Publish</StylistButton>
            <Dialog as="div" open={isDialogOpen} onClose={() => { }}>
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <DialogPanel transition className="w-full max-w-lg rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Post Publishing Confirmation
                        </DialogTitle>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Are you sure you want to publish this blog post publicly? Publishing a post means you have carefully reviewed it and that it does not violate our terms and services.
                        </p>
                        <div className="mt-3 flex items-center justify-end gap-5">
                            <StylistButton size="sm" colorScheme="red" onClick={() => setDialogOpen(false)} isDisabled={isPending}>Dismiss</StylistButton>
                            <StylistButton size="sm" colorScheme="blue" onClick={handlePostPublish} isLoading={isPending}>Confirm</StylistButton>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};
