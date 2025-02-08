import { Metadata } from "next";
import Link from "next/link";
import getClubInfo from "@/constant/getClubInfo";
import { IoIosArrowBack } from "react-icons/io";


export const metadata: Metadata = {
    title: "Terms of Service"
};

export default async function Page() {

    const clubInfo = await getClubInfo();

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
                    Terms of Service
                </h2>
            </menu>

            <p className="text-gray-900 dark:text-gray-300 text-sm mb-6">
                Last Updated: <span className="font-semibold">08 February 2025, 10:00 PM</span>
            </p>

            <p className="text-gray-900 dark:text-gray-300 text-base mb-6">
                Welcome to {clubInfo.name}! These Terms of Service ("Terms") govern your use of our website <Link href="/" className="text-blue-500 hover:text-blue-600 transition-all">{process.env.NEXT_PUBLIC_APP_BASE_URL}</Link>. By accessing or using our website, you agree to these Terms.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        1. Purpose of the Website
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        This is the official website of <strong>{clubInfo.name}</strong>, used for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            Member management
                        </li>
                        <li>
                            Blog posting
                        </li>
                        <li>
                            Issuing and verifying digital documents
                        </li>
                        <li>
                            Sending notices
                        </li>
                        <li>
                            Recording manual payment information
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        2. Who Can Use Our Website?
                    </h2>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            Anyone of any age can visit and learn from our website.
                        </li>
                        <li>
                            Only individuals aged 12+ can apply for club membership.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        3. User Responsibilities
                    </h2>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            Spamming, copying content without permission, and unauthorized information sharing are strictly prohibited.
                        </li>
                        <li>
                            All members must follow internal club rules.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        4. Content Submission Rules
                    </h2>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            Content should be original and not directly copied from other sources.
                        </li>
                        <li>
                            Images cannot be taken from third-party copyrighted sources.
                        </li>
                        <li>
                            You can use ideas from other sources, but content must be written in your own words.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        5. Liability Disclaimer
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        We are not responsible for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            External links shared on our website.
                        </li>
                        <li>
                            User-generated content in blog posts and discussions.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        6. Contact Information
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        If you have any questions about these Terms, please contact us.
                    </p>
                </section>
            </div>
        </>
    );
};