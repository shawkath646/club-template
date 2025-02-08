import { Metadata } from "next";
import Link from "next/link";
import NoItemFound from "@/components/NoItemFound";
import { IoIosArrowBack } from "react-icons/io";

export const metadata: Metadata = {
    title: "My posts"
}

export default async function Page() {
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
                    My Posts
                </h2>
            </menu>
            <NoItemFound label="blog post" />
        </>
    );
}