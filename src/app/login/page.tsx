import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { PagePropsType } from "@/types";

export const metadata: Metadata = {
    title: "Login"
};

export default async function Page({ searchParams: searchParamsPromise }: PagePropsType) {

    const searchParams = await searchParamsPromise;
    let redirectTo = searchParams.callbackUrl;
    if (Array.isArray(redirectTo)) redirectTo = redirectTo[0];

    return (
        <div className="flex lg:items-center justify-center lg:h-[700px]">
            <section className="max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back to NBC team</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Login with your NBC credentials provided by Narsingdi Biggan Club team
                </p>
                <LoginForm redirectTo={redirectTo} />
            </section>
        </div>
    );
};