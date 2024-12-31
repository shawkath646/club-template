import { Metadata } from "next";
import ResetForm from "./ResetForm";
import { getSession } from "@/backend/auth";
import { PagePropsType } from "@/types";

export const metadata: Metadata = {
    title: "Reset password"
};

export default async function Page({ searchParams: searchParamsPromise }: PagePropsType) {

    const searchParams = await searchParamsPromise;
    let redirectTo = searchParams.callbackUrl;
    if (Array.isArray(redirectTo)) redirectTo = redirectTo[0];

    const session = await getSession();

    return (
        <section className="max-w-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reset password</h2>
            <ResetForm redirectTo={redirectTo} sessionEmail={session?.email} sessionNbcId={session?.nbcId} />
        </section>
    );
}