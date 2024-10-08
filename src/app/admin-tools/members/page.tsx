import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import MemberCard from "./MemberCard";
import DropdownPosition from "./DropdownPosition";
import Pagination from "@/components/navigation/Pagination";
import NoItemFound from "@/components/NoItemFound";
import { getMembersPartialProfile } from "@/backend/members";
import { PagePropsType } from "@/types";

export const metadata: Metadata = {
    title: "Member Management"
};

type AllowedTab = "approved" | "pending" | "suspended" | "rejected";

export default async function Page({ searchParams }: PagePropsType) {

    const currentPage = Number.isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page ?? 1);
    let currentTab: AllowedTab = (searchParams.tab ?? "approved") as AllowedTab;
    let filterBy = searchParams.filterBy ?? "all";
    if (Array.isArray(filterBy)) filterBy = filterBy[0];

    if (Array.isArray(currentTab)) currentTab = currentTab[0] as AllowedTab;

    const allowedTabs: AllowedTab[] = ["approved", "pending", "suspended", "rejected"];
    if (!allowedTabs.includes(currentTab)) currentTab = "approved";

    const URLPrefix = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members`;
    const pageURLPrefix = `${URLPrefix}/?tab=${currentTab}&filterBy=${filterBy}&page=`;
    const filterByPrefix = `${URLPrefix}/?tab=${currentTab}&page=${currentPage}&filterBy=`;

    const { members, totalMembers } = await getMembersPartialProfile({
        query: currentTab,
        pageNumber: currentPage,
        filterBy
    });

    const maximumPage = Math.max(1, Math.ceil(totalMembers / 12));

    if (currentPage > maximumPage) {
        return redirect(pageURLPrefix + maximumPage);
    };

    return (
        <div>
            <h2 className="text-white dark:text-gray-200 text-xl md:text-2xl lg:text-3xl text-center mb-2">Member Management</h2>
            <section className="flex flex-wrap items-center justify-center gap-5 py-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800/40 dark:to-gray-900/40 rounded-lg shadow-lg">
                <Link href={URLPrefix + "?tab=pending"} className={`px-4 py-2 rounded-full ${currentTab === "pending" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Pending
                </Link>
                <Link href={URLPrefix + "?tab=approved"} className={`px-4 py-2 rounded-full ${currentTab === "approved" ? "bg-green-500 text-white" : "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Approved
                </Link>
                <Link href={URLPrefix + "?tab=rejected"} className={`px-4 py-2 rounded-full ${currentTab === "rejected" ? "bg-red-500 text-white" : "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Rejected
                </Link>
                <Link href={URLPrefix + "?tab=suspended"} className={`px-4 py-2 rounded-full ${currentTab === "suspended" ? "bg-yellow-500 text-white" : "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Suspended
                </Link>
            </section>

            <section className="text-right">
                <DropdownPosition selected={filterBy} filterByPrefix={filterByPrefix} />
            </section>

            {!!members.length ? (
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {members.map((data, index) => <MemberCard key={index} data={data} />)}
                </section>
            ) : (
                <NoItemFound label={currentTab + " members"} />
            )}

            {(maximumPage > 1 && !!members.length) && <Pagination URLPrefix={pageURLPrefix} currentPage={currentPage} maximumPage={maximumPage} />}
        </div>
    );
}