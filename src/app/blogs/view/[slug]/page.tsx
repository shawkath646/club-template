import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarkdownPreview from "@/components/MarkdownPreview";
import ShareButton from "./ShareButton";
import { addBlogPostView, getBlogPost } from "@/backend/blogPosts";
import { formatDate } from "@/utils/utils.backend";
import { PagePropsType } from "@/types";
import { FaEye, FaUser, FaClock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";


export async function generateMetadata(pageProps: PagePropsType): Promise<Metadata> {

    const postData = await getBlogPost((await pageProps.params).slug, true);

    return {
        title: postData.title,
        description: postData.excerpt,
        authors: [{ name: postData.authorName }],
        openGraph: {
            title: postData.title,
            description: postData.excerpt,
            url: process.env.NEXT_PUBLIC_APP_BASE_URL + "/blogs/view" + postData.slug,
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
        twitter: {
            card: "summary_large_image",
            title: postData.title,
            description: postData.excerpt,
            images: [postData.thumbnail]
        }
    }
};


export default async function Page(pageProps: PagePropsType) {

    const postData = await getBlogPost(decodeURIComponent((await pageProps.params).slug), true);
    await addBlogPostView(postData.id);

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
                    View Blog Post
                </h2>
            </menu>

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
