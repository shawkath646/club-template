"use client";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import CheckBox from "@/components/form/CheckBox";
import { changePassword } from "@/backend/auth";
import Link from "next/link";

interface ChangePasswordFormType {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    logoutAllDevice: boolean;
}

const schema = yup.object().shape({
    oldPassword: yup.string().required("Old password is required"),
    newPassword: yup
        .string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .matches(/[0-9]/, "Password must contain at least one number"),
    confirmNewPassword: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Passwords must match")
        .required("Confirm your new password"),
    logoutAllDevice: yup.boolean().required().default(false)
});

export default function PasswordSettings({ lastPasswordChanged }: { lastPasswordChanged: string }) {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { control, formState: { errors, isSubmitting }, handleSubmit, register, setError, reset } = useForm<ChangePasswordFormType>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<ChangePasswordFormType> = async (data) => {
        setSuccessMessage(null);

        const response = await changePassword(data.oldPassword, data.newPassword, data.logoutAllDevice);

        if (response !== true) {
            if (response.oldPassword) {
                setError("oldPassword", { message: response.oldPassword });
            } else if (response.newPassword) {
                setError("newPassword", { message: response.newPassword });
            }
        } else {
            setSuccessMessage("Password changed successfully.");
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white/20 dark:bg-black/20 rounded-xl p-8 shadow-xl backdrop-blur-lg space-y-6 h-fit">
            <div className="space-y-4">
                <p className="text-lg font-medium text-white dark:text-gray-300">
                    Change Password <span className="text-gray-700 dark:text-gray-500 text-sm">(Last changed on: {lastPasswordChanged})</span>
                </p>
                <InputField
                    label="Old Password"
                    type="password"
                    error={errors.oldPassword}
                    {...register("oldPassword")}
                />
                <Link href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/forgot-password`} className="text-sm text-blue-500 hover:text-blue-600 transition-colors">Forgot Passoword?</Link>
                <InputField
                    label="New Password"
                    type="password"
                    error={errors.newPassword}
                    {...register("newPassword")}
                />
                <InputField
                    label="Confirm New Password"
                    type="password"
                    error={errors.confirmNewPassword}
                    {...register("confirmNewPassword")}
                />
            </div>

            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

            <div className="flex justify-between items-center mt-6">
                <Controller
                    name="logoutAllDevice"
                    control={control}
                    render={({ field }) => (
                        <CheckBox field={field} text="Log out of all devices" />
                    )}
                />
                <StylistButton
                    type="submit"
                    size="sm"
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    loadingLabel="Please wait..."
                >
                    Submit
                </StylistButton>
            </div>
        </form>
    );
};
