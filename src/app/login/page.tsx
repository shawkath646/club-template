import { Metadata } from "next";
import LoginClientForm from "./LoginClientForm";
import { PagePropsType } from "@/types";

export const metadata: Metadata = {
    title: "Login"
};

export default function Page({ searchParams }: PagePropsType) {

    let callbackUrl = searchParams.callbackUrl;
    if (Array.isArray(callbackUrl)) callbackUrl = callbackUrl[0];

    return (
        <div className="flex lg:items-center justify-center lg:h-[700px]">
            <section className="max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back to NBC team</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Login with your NBC credentials provided by Narsingdi Biggan Club team
                </p>
                <LoginClientForm callbackUrl={callbackUrl} />
            </section>
        </div>
    );
};