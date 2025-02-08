"use client";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";
import FileUpload from "@/components/form/FileUpload";
import CheckBox from "@/components/form/CheckBox";
import StylistButton from "@/components/form/StylistButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { setNotice } from "@/backend/notice";
import validationSchema from "./formValidation";
import { NoticeFormType, DialogStateType, ClubInfoType } from "@/types";
import { fileToBase64 } from "@/utils/utils.frontend";
import SubmittingDialog from "./SubmittingDialog";


export default function AddNotice({ clubInfo }: { clubInfo: ClubInfoType }) {

    const [dialogState, setDialogState] = useState<DialogStateType>({
        isOpen: false,
        status: "initial",
        message: "",
    });

    const { register, control, clearErrors, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<NoticeFormType>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<NoticeFormType> = async (data) => {
        setDialogState({ isOpen: true, status: "loading", message: "" });

        try {
            const resolvedData: NoticeFormType = {
                ...data,
                attachment: data.attachment && await fileToBase64(data.attachment as File),
            };

            const response = await setNotice(resolvedData);
            if (response.status) {
                reset();
                setDialogState({ isOpen: true, status: "success", message: response.id });
            };
        } catch (error: any) {
            console.error("Notice submission error:", error);
            setDialogState({ isOpen: true, status: "failed", message: error.message });
        }
    };

    return (
        <section>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black dark:text-gray-200 mb-5">Add Notice</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-4">
                        <InputField
                            label="Title"
                            {...register("title")}
                            error={errors.title}
                            className="w-full"
                        />
                        <TextAreaField
                            label="Description"
                            rows={6}
                            {...register("description")}
                            error={errors.description}
                            className="w-full"
                        />
                    </div>

                    <div className="lg:col-span-1 flex items-center">
                        <Controller
                            name="attachment"
                            control={control}
                            render={({ field }) => (
                                <FileUpload
                                    field={field}
                                    label="Attachment (Optional)"
                                    setError={(message) =>
                                        setError("attachment", { message })
                                    }
                                    clearError={() => clearErrors("attachment")}
                                    error={errors.attachment}
                                />
                            )}
                        />
                    </div>
                </div>

                <Controller
                    name="isImportant"
                    defaultValue={false}
                    control={control}
                    render={({ field }) => (
                        <CheckBox field={field} text="Mark as important" />
                    )}
                />

                <div className="flex justify-center">
                    <StylistButton
                        type="submit"
                        colorScheme="blue"
                        isLoading={isSubmitting}
                        loadingLabel="Publishing..."
                        size="md"
                    >
                        Publish
                    </StylistButton>
                </div>
            </form>
            <SubmittingDialog clubInfo={clubInfo} dialogState={dialogState} setDialogState={setDialogState} />
        </section>
    );
};