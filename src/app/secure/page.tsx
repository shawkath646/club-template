import Link from "next/link";
import NoPermission from "@/components/NoPermission";
import { resetGmailApiKey } from "@/backend/secure";
import { auth } from "@/config/auth.config";

export default async function Page() {

    const session = await auth();
    if (session?.user.id !== process.env.DEVELOPER_ID) return <NoPermission />

    return (
        <section>
            <Link href={resetGmailApiKey}>Reset Gmail API Key</Link>
        </section>
    );
};