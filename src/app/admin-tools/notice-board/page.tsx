import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { getSession } from "@/backend/auth";
import AddNotice from "./AddNotice";
import NoticeCard from "./NoticeCard";
import { getNotices } from "@/backend/notice";
import getClubInfo from "@/constant/getClubInfo";
import { PagePropsType } from "@/types";


export const metadata: Metadata = {
    title: "Notice Board"
};

export default async function Page({ searchParams: searchParamsPromise }: PagePropsType) {
    const searchParams = await searchParamsPromise;
    const session = await getSession();
    if (!session?.permissions.includes("notice")) unauthorized();

    const clubInfo = await getClubInfo();

    const currentPage = Number.isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page ?? 1);
    const notices = await getNotices(currentPage);

    return (
        <>
            {(currentPage === 1) && <AddNotice clubInfo={clubInfo} />}
            <section>
                {notices.map((item, index) => <NoticeCard key={index} data={item} />)}
            </section>
        </>
    );
}