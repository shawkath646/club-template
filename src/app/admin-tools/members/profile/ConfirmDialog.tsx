"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextAreaField from "@/components/form/TextAreaField";
import SelectBox from "@/components/form/SelectBox";
import StylistButton from "@/components/form/StylistButton";
import { updateStatus } from "@/backend/members";
import joiningFormOption from "@/constant/joiningFormOptions.json";
import { ClubInfoType, MemberProfileType } from "@/types";

interface UpdateStatusField {
    position: string;
    specialNote?: string;
};

export default function ConfirmDialog({
    docId,
    clubInfo,
    specialNote,
    position,
    dialogState,
    setDialogState,
    decodedCallbackUrl
}: {
    docId: string;
    clubInfo: ClubInfoType;
    specialNote?: string,
    position: string;
    dialogState: { isOpen: boolean; changeStatus: MemberProfileType["club"]["status"] };
    setDialogState: Dispatch<SetStateAction<{ isOpen: boolean; changeStatus: MemberProfileType["club"]["status"] }>>;
    decodedCallbackUrl: string;
}) {

    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateStatusField>({
        defaultValues: {
            position,
            specialNote
        }
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<UpdateStatusField> = async (data) => {
        await updateStatus(docId, {
            ...data,
            status: dialogState.changeStatus,
        });
        setDialogState({ isOpen: false, changeStatus: dialogState.changeStatus });
        router.push(decodedCallbackUrl);
    };

    return (
        <Dialog open={dialogState.isOpen} onClose={() => { }} className="relative z-10">
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-all">
                    <div className="flex items-center justify-center mb-8 space-x-2">
                        <Image
                            src={clubInfo.logo}
                            height={48}
                            width={48}
                            alt={`${clubInfo.name} Logo`}
                            className="w-10 h-10 md:w-12 md:h-12"
                        />
                        <h3 className="text-lg lg:text-xl text-gray-800 dark:text-gray-200">
                            {clubInfo.name}
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="mb-4">Would you like to change status of this member to "{dialogState.changeStatus}"?</h3>
                        {(dialogState.changeStatus === "approved") && (
                            <Controller
                                name="position"
                                control={control}
                                render={({ field }) => <SelectBox label="Position" field={field} options={joiningFormOption.positions} />}
                            />
                        )}
                        <TextAreaField fieldId="specialNote" label="Special Note" {...register("specialNote", { maxLength: { value: 300, message: "Special note must be at most 300 characters long" } })} error={errors.specialNote} />

                        <div className="flex items-center justify-end gap-3 mt-5">
                            <StylistButton isDisabled={isSubmitting} size="sm" colorScheme="red" onClick={() => setDialogState({ isOpen: false, changeStatus: dialogState.changeStatus })}>Dismiss</StylistButton>
                            <StylistButton type="submit" isLoading={isSubmitting} size="sm">Update</StylistButton>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
};
