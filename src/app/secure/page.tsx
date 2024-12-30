import Link from "next/link";
import { unauthorized } from "next/navigation";
import { resetGmailApiKey } from "@/backend/secure";
import { getSession } from "@/backend/auth";

export default async function Page() {

    const session = await getSession();
    if (session?.id !== process.env.DEVELOPER_ID) unauthorized();

    return (
        <section>
            <Link href={resetGmailApiKey}>Reset Gmail API Key</Link>
        </section>
    );
};