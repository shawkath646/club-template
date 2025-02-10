"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./formValidation";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import PostSubmittingDialog from "./PostSubmittingDialog";
import ArrayInput from "@/components/form/ArrayInput";
import InputField from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";
import FileUpload from "@/components/form/FileUpload";
import StylistButton from "@/components/form/StylistButton";
import { addBlogPost } from "@/backend/blogPosts";
import { BlogPostFormType, BlogPostType, ClubInfoType, DialogStateType } from "@/types";


export default function BlogPostForm({ clubInfo, postData }: { clubInfo: ClubInfoType, postData?: BlogPostType }) {

    const initialSubmitingDialog: DialogStateType = {
        isOpen: false,
        status: "initial",
        message: "",
    };

    const [dialogState, setDialogState] = useState<DialogStateType>(initialSubmitingDialog);
    const { control, clearErrors, formState: { errors, isSubmitting }, handleSubmit, register, reset, setError, watch } = useForm<BlogPostFormType>({
        defaultValues: {
            postText: postData?.postText || "",
            thumbnail: postData?.thumbnail || "",
            title: postData?.title || "",
            excerpt: postData?.excerpt || "",
            keywords: postData?.keywords || []
        },
        resolver: yupResolver(validationSchema)
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<BlogPostFormType> = async (data) => {
        setDialogState({ isOpen: true, status: "loading", message: "Submitting your post..." });
        const response = await addBlogPost(data, postData?.id);
        if (response.success) {
            reset();
            setDialogState({ isOpen: true, status: "success", message: "Blog post submitted successfully!" });
            setTimeout(() => {
                router.push("/blogs");
            }, 2000);
        } else {
            setDialogState({ isOpen: true, status: "failed", message: response.message });
        };
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField label="Title" {...register("title")} error={errors.title} />

                <div className="flex flex-col md:flex-row gap-4">
                    <TextAreaField label="Short Description (Optional)" {...register("excerpt")} error={errors.excerpt} className="flex-1" rows={5} />

                    <Controller
                        name="thumbnail"
                        control={control}
                        render={({ field }) => (
                            <FileUpload
                                label="Thumbnail"
                                field={field}
                                error={errors.thumbnail}
                                setError={message => setError("thumbnail", { message })}
                                clearError={() => clearErrors("thumbnail")}
                                isBase64
                                maxFileSize={2}
                                type="image"
                            />
                        )}
                    />
                </div>


                <div>
                    <label
                        htmlFor="postText"
                        className="text-sm font-medium text-gray-200 dark:text-gray-300 block mb-2"
                    >
                        Post Text:
                    </label>
                    <Controller
                        name="postText"
                        control={control}
                        render={({ field }) => (
                            <MDEditor
                                {...field}
                                previewOptions={{
                                    rehypePlugins: [[rehypeSanitize]],
                                }}
                                height={400}
                                preview="edit"

                            />
                        )}
                    />
                    {errors.postText && <p className="mt-2 text-sm text-red-500">{errors.postText.message}</p>}
                </div>

                <Controller
                    name="keywords"
                    control={control}
                    render={({ field }) => (
                        <ArrayInput
                            label="Keywords"
                            field={field}
                            setError={message => setError("keywords", { message })}
                            clearError={() => clearErrors("keywords")}
                            error={errors.keywords}
                        />
                    )}
                />

                <div className="flex items-center justify-center mt-10">
                    <StylistButton type="submit" size="md" colorScheme="blue" isLoading={isSubmitting}>Submit</StylistButton>
                </div>
            </form>
            <PostSubmittingDialog
                clubInfo={clubInfo}
                dialogState={dialogState}
                setDialogState={setDialogState}
            />
        </>
    );
}