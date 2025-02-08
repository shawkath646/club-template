import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NoItemFound from "@/components/NoItemFound";
import Pagination from "@/components/navigation/Pagination";
import { getSession } from "@/backend/auth";
import { getPartialBlogPosts } from "@/backend/blogPosts";
import { formatDate } from "@/utils/utils.backend";
import { PagePropsType } from "@/types";
import { FaEye, FaUser, FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";


export const metadata: Metadata = {
    title: "Blog posts management"
};

export default async function Page(pageProps: PagePropsType) {

    const session = await getSession();

    const searchParams = await pageProps.searchParams;
    const currentPage = Number.isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page ?? 1);

    const { blogPosts, totalPosts } = await getPartialBlogPosts(1, false);
    const maximumPage = Math.max(1, Math.ceil(totalPosts / 12));

    return (
        <>
            <menu className="flex space-x-3 items-center text-white dark:text-gray-200 mb-5 bg-black/20 py-3 px-2 rounded shadow-lg">
                <Link
                    href={"/admin-tools"}
                    className="hover:text-gray-300 transition-all duration-300 ease-in-out hover:scale-105"
                >
                    <IoIosArrowBack size={32} className="text-white drop-shadow-md" />
                </Link>
                <h2 className="text-xl md:text-2xl text-white font-semibold drop-shadow-md">
                    Blog Posts Management
                </h2>
            </menu>
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
                                {session?.permissions.includes("members") ? (
                                    <Link href={"/admin-tools/members/profile?id=" + item.authorId} className="flex items-center gap-1 text-sky-500 truncate">
                                        <FaUser size={12} /> {item.authorName}
                                    </Link>
                                ) : (
                                    <span className="flex items-center gap-1 text-sky-500 truncate">
                                        <FaUser size={12} /> {item.authorName}
                                    </span>
                                )}
                                <span className="flex items-center gap-1 text-emerald-500">
                                    <FaCalendarAlt size={12} /> {formatDate(item.timestamp)}
                                </span>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 h-[6rem]">
                                {item.excerpt}
                            </p>

                            <Link
                                href={"/admin-tools/blogs/" + item.id}
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
            {(maximumPage > 1 && !!blogPosts.length) && <Pagination URLPrefix="/admin-tools/blogs" currentPage={currentPage} maximumPage={maximumPage} />}
        </>
    );
};
