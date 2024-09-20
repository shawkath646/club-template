import { auth } from "@/config/auth.config";
import NoPermission from "@/components/NoPermission";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const session = await auth();
    if (!session?.user.permissions.length) return <NoPermission />;
    return children;
};
