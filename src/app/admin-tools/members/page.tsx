import { Metadata } from "next";
import NonMemberList from "./NonMemberList";
import ExistingMemberList from "./ExistingMemberList";
import { getMembersProfile } from "@/backend/members";
import NoItemFound from "@/components/NoItemFound";

export const metadata: Metadata = {
    title: "Member Management"
};

export default async function Page() {

    const pendingMembers = await getMembersProfile({ query: "pending" });
    const existingMembers = await getMembersProfile({ query: "approved" });

    return (
        <>
            <h1 className="text-2xl font-bold text-black dark:text-gray-200 mb-8">Member Management</h1>
            {!!pendingMembers.length && <NonMemberList preloadPendingMembers={pendingMembers} />}
            {!!existingMembers.length && <ExistingMemberList preloadExistingMembers={existingMembers} />}

            {(!pendingMembers.length && !existingMembers.length) && <NoItemFound label="member" />}
        </>
    );
}