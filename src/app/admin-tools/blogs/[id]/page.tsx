import { Metadata } from "next";
import Image from "next/image";
import MarkdownPreview from "@/components/MarkdownPreview";
import RejectButton from "./RejectButton";
import PublishButton from "./PublishButton";
import { getBlogPost } from "@/backend/blogPosts";
import getClubInfo from "@/constant/getClubInfo";
import { formatDate } from "@/utils/utils.backend";
import { PagePropsType } from "@/types";
import { FaEye, FaUser, FaClock } from "react-icons/fa";

export async function generateMetadata(pageProps: PagePropsType): Promise<Metadata> {
    const clubInfo = await getClubInfo();
    const postData = await getBlogPost((await pageProps.params).id);
    
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
            "Read scientific articles"
        ],
        openGraph: {
            title: postData.title,
            description: postData.excerpt,
            url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/blogs/${postData.id}`,
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

    const postData = await getBlogPost((await pageProps.params).id);

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

            <section className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mt-3 text-sm">
                <div className="flex items-center text-pink-500">
                    <FaEye className="mr-2" />
                    <span>{postData.seenBy} views</span>
                </div>
                <div className="flex items-center text-blue-500">
                    <FaUser className="mr-2" />
                    <span>{postData.authorName}</span>
                </div>
                <div className="flex items-center text-emerald-500">
                    <FaClock className="mr-2" />
                    <span>{formatDate(postData.timestamp, { isTime: true })}</span>
                </div>
            </section>

            <section className="mt-6 text-gray-800 dark:text-gray-300 leading-relaxed">
                <MarkdownPreview markdownContent={postData.postText} />
            </section>
            {postData.keywords.length > 0 && (
                <section className="mt-5">
                    <p>Keywords:</p>
                    <div className="mt-3 flex flex-wrap gap-2 items-center mb-3">
                        {postData.keywords.map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-md text-sm hover:bg-yellow-500/30 transition"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </section>
            )}
            <section className="flex items-center justify-end gap-5">
                {!postData.isApproved && ( 
                    <PublishButton docId={postData.id} />
                )}
                <RejectButton docId={postData.id} isApproved={postData.isApproved} />
            </section>
        </>
    );
}