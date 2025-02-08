"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./formValidation";
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import { getPasswordResetCode, resetPassword } from "@/backend/auth";
import { ResetPasswordFormType } from "@/types";


export default function ResetPasswordForm({
    redirectTo,
    sessionEmail,
    sessionNbcId
}: {
    redirectTo?: string;
    sessionEmail?: string;
    sessionNbcId?: number;
}) {
    const [sessionId, setSessionId] = useState("");
    const [isPending, startTransition] = useTransition();
    const { register, handleSubmit, getValues, clearErrors, setError, formState: { isSubmitting, errors } } = useForm<ResetPasswordFormType>({
        defaultValues: {
            email: sessionEmail,
            nbcId: sessionNbcId
        },
        resolver: yupResolver(validationSchema)
    });
    const router = useRouter();

    const onSubmit: SubmitHandler<ResetPasswordFormType> = async (data) => {
        const response = await resetPassword(sessionId, data.verificationCode, data.newPassword);
        if (response.success) {
            router.push(redirectTo ?? "/login");
            return;
        }
        if (response.verificationCode) setError("verificationCode", { message: response.verificationCode });
        if (response.newPassword) setError("newPassword", { message: response.newPassword });
    };

    const handleSendCode = () => startTransition(async () => {
        clearErrors();

        const providedEmail = getValues("email");
        const providedNbcId = getValues("nbcId");

        try {
            await validationSchema.validateAt("email", { email: providedEmail });
            await validationSchema.validateAt("nbcId", { nbcId: providedNbcId });

            const response = await getPasswordResetCode(providedEmail, Number(providedNbcId));

            if (response.success) {
                setSessionId(response.tempSessionId);
            } else {
                if ("email" in response) {
                    setError("email", { message: response.email });
                } else if ("nbcId" in response) {
                    setError("nbcId", { message: response.nbcId });
                }
            }
        } catch (err: any) {
            if (err.path && err.message) {
                setError(err.path as keyof ResetPasswordFormType, { message: err.message });
            }
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-8">
            <InputField type="number" label="NBC ID" {...register("nbcId")} disabled={!!sessionId} error={errors.nbcId} />
            <div className="flex items-start space-x-2">
                <InputField type="text" label="Primary email" {...register("email")} disabled={!!sessionId} error={errors.email} />
                <StylistButton
                    onClick={handleSendCode}
                    size="sm"
                    colorScheme="green"
                    isLoading={isPending}
                    isDisabled={!!sessionId}
                    className="mt-8"
                >
                    Send code
                </StylistButton>
            </div>
            {sessionId && (
                <p className="text-sm my-2 text-green-500">
                    A 6-digit verification code has been sent to your email address. Enter the code to reset your NBC ID's password. This code will expire in 5 minutes.
                </p>
            )}
            <InputField type="text" label="Verification code" {...register("verificationCode")} error={errors.verificationCode} />
            <InputField type="password" label="New password" {...register("newPassword")} error={errors.newPassword} />
            <InputField type="password" label="Confirm new password" {...register("confirmNewPassword")} error={errors.confirmNewPassword} />

            <div className="text-center">
                <StylistButton type="submit" size="md" isLoading={isSubmitting}>
                    Submit
                </StylistButton>
            </div>
        </form>
    );
}
