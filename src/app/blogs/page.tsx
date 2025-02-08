import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NoItemFound from "@/components/NoItemFound";
import Pagination from "@/components/navigation/Pagination";
import { getPartialBlogPosts } from "@/backend/blogPosts";
import { formatDate } from "@/utils/utils.backend";
import { PagePropsType } from "@/types";
import { FaPen, FaCheckCircle, FaThumbsUp, FaShareAlt, FaArrowRight, FaEye, FaUser, FaCalendarAlt } from 'react-icons/fa';
import { IoIosArrowBack } from "react-icons/io";
import { LuBookText } from "react-icons/lu";

export const metadata: Metadata = {
    title: "Blog Posts"
};

export default async function Page(pageProps: PagePropsType) {

    const searchParams = await pageProps.searchParams;
    const currentPage = Number.isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page ?? 1);

    const { blogPosts, totalPosts } = await getPartialBlogPosts(currentPage, true);
    const maximumPage = Math.max(1, Math.ceil(totalPosts / 12));

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
                    Blog Posts
                </h2>
            </menu>

            <section className="mb-10 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">How to Write and Publish Your Science Blog Post</h2>
                <div className="space-y-4">
                    <p className="flex items-center text-gray-900 dark:text-gray-100">
                        <FaPen className="text-blue-500 mr-2" />
                        Write your thoughts about science as a blog post and publish it on our website. Expand your knowledge and inspire others.
                    </p>
                    <div className="space-y-2 pl-6">
                        <p className="flex items-center text-gray-900 dark:text-gray-100">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            Step 1:
                            <Link href="/join" className="mx-1 text-blue-400 hover:text-blue-500 transition-all">Join</Link>
                            our science club
                        </p>
                        <p className="flex items-center text-gray-900 dark:text-gray-100">
                            <FaPen className="text-yellow-500 mr-2" />
                            Step 2: Write your blog post
                        </p>
                        <p className="flex items-center text-gray-900 dark:text-gray-100">
                            <FaThumbsUp className="text-blue-500 mr-2" />
                            Step 3: Our admin will review the post
                        </p>
                        <p className="flex items-center text-gray-900 dark:text-gray-100">
                            <FaShareAlt className="text-purple-500 mr-2" />
                            Step 4: Your post will be published and ready to share!
                        </p>
                    </div>
                    <p className="flex items-center text-gray-900 dark:text-gray-100">
                        <FaShareAlt className="text-purple-500 mr-2" />
                        You can share your blog post on social media to reach a wider audience.
                    </p>
                    <div className="flex items-center justify-center mt-4 gap-4">
                        <Link href="/blogs/write" className="inline-flex items-center text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-6 py-2 rounded-full">
                            Start Now <FaArrowRight className="ml-2" />
                        </Link>
                        <Link href="/blogs/my-posts" className="inline-flex items-center text-white bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 px-6 py-2 rounded-full">
                            My Posts <LuBookText className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>
            {!!blogPosts.length ? (
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {blogPosts.map((item) => (
                        <article key={item.id} className="bg-white dark:bg-gray-900/20 rounded-lg shadow-md p-3 transition hover:shadow-lg text-sm">
                            <Image
                                src={item.thumbnail}
                                alt="Blog post thumbnail"
                                className="rounded-md w-full h-36 object-cover"
                                width={250}
                                height={150}
                            />

                            <h3 className="text-lg font-medium mt-2 h-[3.5rem] text-black dark:text-white line-clamp-2">
                                {item.title}
                            </h3>

                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
                                <span className="flex items-center gap-1 text-pink-500">
                                    <FaEye size={12} /> {item.seenBy}
                                </span>
                                <span className="flex items-center gap-1 text-sky-500 truncate">
                                    <FaUser size={12} /> {item.authorName}
                                </span>
                                <span className="flex items-center gap-1 text-emerald-500">
                                    <FaCalendarAlt size={12} /> {formatDate(item.timestamp)}
                                </span>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 h-[6rem]">
                                {item.excerpt}
                            </p>

                            <Link
                                href={"/blogs/view/" + item.slug}
                                className="mt-4 w-full inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition-all py-1 rounded text-white dark:text-gray-200 text-sm"
                            >
                                View
                            </Link>
                        </article>
                    ))}
                </section>
            ) : (
                <NoItemFound label="blog post" />
            )}
           {(maximumPage > 1 && !!blogPosts.length) && <Pagination URLPrefix="/blogs" currentPage={currentPage} maximumPage={maximumPage} />}
        </>
    );
}