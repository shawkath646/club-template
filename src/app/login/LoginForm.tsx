"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import validationSchema from "./formValidation";
import { signIn } from "@/backend/auth";
import { LoginFormType } from "@/types";


export default function LoginForm({ redirectTo }: { redirectTo?: string; }) {
    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<LoginFormType>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
        const response = await signIn(Number(data.nbcId), data.password, { redirectTo });
        if (response?.nbcId) setError("nbcId", { message: response.nbcId });
        if (response?.password) setError("password", { message: response.password });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
            <InputField type="number" label="NBC ID" {...register("nbcId")} error={errors.nbcId} />
            <InputField type="password" label="Password" {...register("password")} error={errors.password} />

            <Link href="/reset-password" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 block">Forgot your password?</Link>

            <div className="text-center">
                <StylistButton type="submit" size="md" isLoading={isSubmitting}>Login</StylistButton>
            </div>
        </form>
    );
}