"use client";
import { Metadata } from "next";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/form/InputField";
import StylistButton from "@/components/form/StylistButton";
import validationSchema from "./formValidation";
import { userSignIn } from "@/backend/userAuth";
import { LoginFormType } from "@/types";

// export const metadata: Metadata = {
//     title: "Login"
// };


export default function Page() {

    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<LoginFormType>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
        const response = await userSignIn(data);
        if (response?.nbcId) setError("nbcId", { message: response.nbcId });
        if (response?.password) setError("password", { message: response.password });
    };

    return (
        <div className="flex lg:items-center justify-center lg:h-[700px]">
            <section className="max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back to NBC team</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Login with your NBC credentials provided by Narsingdi Biggan Club team
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                    <InputField type="text" fieldId="nbcId" label="NBC ID" {...register("nbcId")} error={errors.nbcId} />
                    <InputField type="password" fieldId="password" label="Password" {...register("password")} error={errors.password} />

                    <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 block">Forgot your password?</Link>

                    <div className="text-center">
                        <StylistButton type="submit" size="md" isLoading={isSubmitting}>Login</StylistButton>
                    </div>
                </form>
            </section>
        </div>
    );
};