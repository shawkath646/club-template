import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import MemberCard from "./MemberCard";
import DropdownPosition from "./DropdownPosition";
import SearchBar from "./MemberSearchBar";
import Pagination from "@/components/navigation/Pagination";
import NoItemFound from "@/components/NoItemFound";
import { getMembersCount, getMembersPartialProfile } from "@/backend/members";
import { PagePropsType } from "@/types";
import { IoIosArrowBack } from "react-icons/io";


export const metadata: Metadata = {
    title: "Member Management"
};

type AllowedTab = "approved" | "pending" | "suspended" | "rejected";

export default async function Page(pageProps: PagePropsType) {

    const searchParams = await pageProps.searchParams;
    const currentPage = Number.isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page ?? 1);
    let currentTab: AllowedTab = (searchParams.tab ?? "approved") as AllowedTab;
    let filterBy = searchParams.filterBy ?? "all";
    if (Array.isArray(filterBy)) filterBy = filterBy[0];

    if (Array.isArray(currentTab)) currentTab = currentTab[0] as AllowedTab;

    const allowedTabs: AllowedTab[] = ["approved", "pending", "suspended", "rejected"];
    if (!allowedTabs.includes(currentTab)) currentTab = "approved";

    const URLPrefix = "/admin-tools/members";
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

    const membersCount = await getMembersCount();

    return (
        <>
            <menu className="flex space-x-3 items-center text-white dark:text-gray-200 mb-5 bg-black/20 py-3 px-2 rounded shadow-lg">
                <Link
                    href="/admin-tools"
                    className="hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105"
                >
                    <IoIosArrowBack size={32} className="text-white drop-shadow-md" />
                </Link>
                <h2 className="text-xl md:text-2xl text-white font-semibold drop-shadow-md">
                    Member Management
                </h2>
            </menu>
            <section className="flex flex-wrap items-center justify-center gap-5 py-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800/40 dark:to-gray-900/40 rounded-lg shadow-lg">
                <Link href={URLPrefix + "?tab=pending"} className={`px-4 py-2 rounded-full ${currentTab === "pending" ? "bg-blue-500 text-white" : "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Pending ({membersCount.pendingMembers})
                </Link>
                <Link href={URLPrefix + "?tab=approved"} className={`px-4 py-2 rounded-full ${currentTab === "approved" ? "bg-green-500 text-white" : "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Approved ({membersCount.approvedMembers})
                </Link>
                <Link href={URLPrefix + "?tab=rejected"} className={`px-4 py-2 rounded-full ${currentTab === "rejected" ? "bg-red-500 text-white" : "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Rejected ({membersCount.rejectedMembers})
                </Link>
                <Link href={URLPrefix + "?tab=suspended"} className={`px-4 py-2 rounded-full ${currentTab === "suspended" ? "bg-yellow-500 text-white" : "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"} dark:hover:text-gray-200 transition-transform transform hover:scale-105 hover:shadow-md`}>
                    Suspended ({membersCount.suspendedMembers})
                </Link>
            </section>

            <section className="flex items-center justify-between flex-wrap">
                <SearchBar />
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
        </>
    );
}