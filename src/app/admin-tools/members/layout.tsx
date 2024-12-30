import { unauthorized } from "next/navigation";
import { getSession } from "@/backend/auth";


export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const session = await getSession();
    if (!session?.permissions.includes("members")) unauthorized();
    return children;
};
