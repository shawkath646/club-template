"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputField from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";
import FileUpload from "@/components/form/FileUpload";
import CheckBox from "@/components/form/CheckBox";
import StylistButton from "@/components/form/StylistButton";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./formValidation";
import { NoticeFormType } from "@/types";



export default function AddNotice() {

    const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<NoticeFormType>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<NoticeFormType> = async (data) => {
        console.log(data);
    };

    return (
        <>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-black dark:text-gray-200 mb-5">Add Notice</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Title Input */}
                    <div className="lg:col-span-2">
                        <InputField
                            label="Title"
                            fieldId="title"
                            {...register("title")}
                            error={errors.title}
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
                                    error={errors.attachment}
                                />
                            )}
                        />
                    </div>
                </div>

                <div>
                    <TextAreaField
                        label="Description"
                        fieldId="description"
                        rows={6}
                        {...register("description")}
                        error={errors.description}
                        className="w-full"
                    />
                </div>

                <div className="flex items-center">
                    <Controller
                        name="isImportant"
                        control={control}
                        render={({ field }) => (
                            <CheckBox field={field} text="Mark as important" />
                        )}
                    />
                </div>

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
        </>
    );
};