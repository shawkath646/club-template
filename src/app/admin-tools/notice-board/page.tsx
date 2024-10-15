import { Metadata } from "next";
import { auth } from "@/config/auth.config";
import NoPermission from "@/components/NoPermission";
import AddNotice from "./AddNotice";
import NoticeCard from "./NoticeCard";
import { getNotices } from "@/backend/notice";
import getClubInfo from "@/constant/getClubInfo";
import { PagePropsType } from "@/types";


export const metadata: Metadata = {
    title: "Notice Board"
};

export default async function Page({ searchParams }: PagePropsType) {
    const session = await auth();
    if (!session?.user.permissions.includes("notice")) return <NoPermission />;

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