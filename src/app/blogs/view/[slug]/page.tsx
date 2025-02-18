import { Metadata } from "next";
import Image from "next/image";
import MarkdownPreview from "@/components/MarkdownPreview";
import ShareButton from "./ShareButton";
import { addBlogPostView, getBlogPost } from "@/backend/blogPosts";
import getClubInfo from "@/constant/getClubInfo";
import { formatDate } from "@/utils/utils.backend";
import { PagePropsType } from "@/types";
import { FaEye, FaUser, FaClock } from "react-icons/fa";

export async function generateMetadata(pageProps: PagePropsType): Promise<Metadata> {
    const clubInfo = await getClubInfo();
    const slug = decodeURIComponent((await pageProps.params).slug);
    const postData = await getBlogPost(slug, { bySlug: true });

    return {
        title: postData.title,
        description: postData.excerpt,
        authors: [{ name: postData.authorName }],
        keywords: [
            clubInfo.name,
            clubInfo.localName,
            ...postData.keywords,
            "Bengali blog post",
            "Scientific blog post",
            "Science news",
            "Latest scientific research",
            "STEM articles",
            "Educational blog",
            "Science and technology",
            "Research insights",
            "Science club articles",
            "Read scientific articles",
            clubInfo.branding.name
        ],
        openGraph: {
            title: postData.title,
            description: postData.excerpt,
            url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/blogs/view/${postData.slug}`,
            type: "article",
            publishedTime: postData.timestamp.toISOString(),
            images: [
                {
                    url: postData.thumbnail,
                    width: 1200,
                    height: 630,
                    alt: postData.title
                }
            ]
        },
    };
};


export default async function Page(pageProps: PagePropsType) {
    const slug = decodeURIComponent((await pageProps.params).slug);
    const postData = await getBlogPost(slug, { bySlug: true });
    await addBlogPostView(postData.id);

    return (
        <>
            <Image
                src={postData.thumbnail}
                alt={postData.title}
                width={1000}
                height={500}
                className="object-center object-cover w-full h-[500px] rounded shadow-lg"
            />

            <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {postData.title}
            </h1>

            <section className="flex items-center gap-x-4 gap-y-3 text-gray-600 dark:text-gray-400 mt-3 text-sm flex-wrap">
                <p className="flex items-center text-pink-500 whitespace-nowrap">
                    <FaEye className="mr-2" />
                    <span>{postData.seenBy} views</span>
                </p>
                <p className="flex items-center text-blue-500 whitespace-nowrap">
                    <FaUser className="mr-2" />
                    <span>{postData.authorName}</span>
                </p>
                <p className="flex items-center text-emerald-500 whitespace-nowrap">
                    <FaClock className="mr-2" />
                    <span>{formatDate(postData.timestamp, { isTime: true })}</span>
                </p>
                <ShareButton url={process.env.NEXT_PUBLIC_APP_BASE_URL + "/blogs/view/" + postData.slug} />
            </section>

            <section className="mt-6 text-gray-800 dark:text-gray-300 leading-relaxed">
                <MarkdownPreview markdownContent={postData.postText} />
            </section>
        </>
    );
};
