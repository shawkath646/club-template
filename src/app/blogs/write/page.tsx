import { Metadata } from "next";
import { redirect, unauthorized } from "next/navigation";
import Link from "next/link";
import BlogPostForm from "./BlogPostForm";
import { getSession } from "@/backend/auth";
import { getBlogPost } from "@/backend/blogPosts";
import getClubInfo from "@/constant/getClubInfo";
import { BlogPostType, PagePropsType } from "@/types";
import { IoIosArrowBack } from "react-icons/io";


export const metadata: Metadata = {
    title: "Write Blog Post"
}

export default async function Page(pageProps: PagePropsType) {

    const session = await getSession();
    if (!session) redirect("/join");

    let postData: BlogPostType | undefined;
    let modifyingPostId = (await pageProps.searchParams).postId;
    if (Array.isArray(modifyingPostId)) modifyingPostId = modifyingPostId[0];

    if (modifyingPostId) {
        postData = await getBlogPost(modifyingPostId);
        if (session.id !== postData.authorId || postData.isApproved) unauthorized();
    };

    const clubInfo = await getClubInfo();

    return (
        <>
            <menu className="flex space-x-3 items-center text-white dark:text-gray-200 mb-5 bg-black/20 py-3 px-2 rounded shadow-lg">
                <Link
                    href="/blogs"
                    className="hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105"
                >
                    <IoIosArrowBack size={32} className="text-white drop-shadow-md" />
                </Link>
                <h2 className="text-xl md:text-2xl text-white font-semibold drop-shadow-md">
                    Write blog post
                </h2>
            </menu>
            <BlogPostForm clubInfo={clubInfo} />
        </>
    );
};