import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import MemberCard from "./MemberCard";
import DropdownPosition from "../admin-tools/members/DropdownPosition";
import SearchBar from "./MemberSearchBar";
import Pagination from "@/components/navigation/Pagination";
import NoItemFound from "@/components/NoItemFound";
import AdBanner from "@/components/AdBanner";
import { getPublicMembersPartialProfile } from "@/backend/members";
import getClubInfo from "@/constant/getClubInfo";
import { PagePropsType } from "@/types";
import { IoIosArrowBack } from "react-icons/io";

export async function generateMetadata(): Promise<Metadata> {
    const clubInfo = await getClubInfo();

    const clubShortName = clubInfo.name.split(' ')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase())
        .join('');

    return {
        title: clubShortName + " Team"
    }
};

export default async function Page({ searchParams: searchParamsPromise }: PagePropsType) {

    const searchParams = await searchParamsPromise;
    const currentPage = Number.isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page ?? 1);
    let filterBy = searchParams.filterBy ?? "all";
    if (Array.isArray(filterBy)) filterBy = filterBy[0];

    const pageURLPrefix = `/members?filterBy=${filterBy}&page=`;
    const filterByPrefix = `/members?page=${currentPage}&filterBy=`;

    const { members, totalMembers } = await getPublicMembersPartialProfile({
        pageNumber: currentPage,
        filterBy
    });

    const maximumPage = Math.max(1, Math.ceil(totalMembers / 12));

    if (currentPage > maximumPage) {
        return redirect(pageURLPrefix + maximumPage);
    };

    const beforeAdMembers = members.slice(0, 6);
    const afterAdMembers = members.slice(6);

    const clubInfo = await getClubInfo();

    const clubShortName = clubInfo.name.split(' ')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase())
        .join('');

    return (
        <>
            <menu className="flex space-x-3 items-center text-white dark:text-gray-200 mb-5 bg-black/20 py-3 px-2 rounded shadow-lg">
                <Link
                    href="/"
                    className="hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105"
                >
                    <IoIosArrowBack size={32} className="text-white drop-shadow-md" />
                </Link>
                <h2 className="text-xl md:text-2xl text-white font-semibold drop-shadow-md">
                    {clubShortName} Team
                </h2>
            </menu>

            <section className="flex items-center justify-between flex-wrap">
                <SearchBar />
                <DropdownPosition selected={filterBy} filterByPrefix={filterByPrefix} />
            </section>

            {!!members.length ? (
                <>
                    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {beforeAdMembers.map((data, index) => <MemberCard key={index} data={data} />)}
                    </section>
                    <AdBanner
                        data-ad-slot="5910671376"
                        data-ad-format="autorelaxed"
                        data-full-width-responsive="false"
                    />
                    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {afterAdMembers.map((data, index) => <MemberCard key={index} data={data} />)}
                    </section>
                </>
            ) : (
                <>
                    <AdBanner
                        data-ad-slot="5910671376"
                        data-ad-format="autorelaxed"
                        data-full-width-responsive="false"
                    />
                    <NoItemFound label="members" />
                </>
            )}

            {(maximumPage > 1 && !!members.length) && <Pagination URLPrefix={pageURLPrefix} currentPage={currentPage} maximumPage={maximumPage} />}
        </>
    );
}