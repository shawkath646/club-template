import { Metadata } from "next";
import Link from "next/link";
import getClubInfo from "@/constant/getClubInfo";
import { IoIosArrowBack } from "react-icons/io";


export const metadata: Metadata = {
    title: "Privacy Policy"
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
                    Privacy Policy
                </h2>
            </menu>

            <p className="text-gray-900 dark:text-gray-300 text-sm mb-6">
                Last Updated: <span className="font-semibold">08 February 2025, 10:00 PM</span>
            </p>

            <p className="text-gray-900 dark:text-gray-300 text-base mb-6">
                Welcome to {clubInfo.name} ("we," "our," "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website <Link href="/" className="text-blue-500 hover:text-blue-600 transition-all">{process.env.NEXT_PUBLIC_APP_BASE_URL}</Link>
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        1. Information We Collect
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        When you join <strong>{clubInfo.name}</strong>, we collect the following information::
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            <strong>Personal Information:</strong> Full Name, Parents' Name, Gender, Date of Birth, Address.
                        </li>
                        <li>
                            <strong>Identification Information:</strong> Email, Phone Number, National ID/Passport/Birth Registration Number, Facebook Profile URL.
                        </li>
                        <li>
                            <strong>Educational Information:</strong> Institute/Workplace, Institute Address, Class/Position, Subject/Field, Student ID Number, Educational Background.
                        </li>
                        <li>
                            <strong>Club-Related Information:</strong> Interests in a specific club field, reason for joining, extracurricular activities.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        2. How We Collect Information
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        We collect data through the <strong><Link href="/join" className="text-blue-500 hover:text-blue-600 transition-all">club joining signup form</Link></strong> on our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        3. How We Use Your Information
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        Your data is used for the following purposes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            <strong>Personal Identification:</strong> To verify users and prevent duplicate accounts.
                        </li>
                        <li>
                            <strong>Issuing Documents:</strong> Personal information such as parents' name, date of birth, and address may be used for event registrations and certificates.
                        </li>
                        <li>
                            <strong>Security & Rule Enforcement:</strong> National ID/Passport/Birth Registration Number helps in identifying members in case of rule violations or lost IDs.
                        </li>
                        <li>
                            <strong>Member Organization:</strong> Educational information helps in grouping members based on institutes and classes for better collaboration.
                        </li>
                        <li>
                            <strong>Club Activities:</strong> Club-related information personalizes your experience and participation.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        4. Data Sharing
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        We do not share your data with any third parties. All collected information is securely stored.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        5. Use of Cookies
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        We only use cookies for user authentication and do not track personal activities.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        6. Data Retention and Deletion
                    </h2>
                    <ul className="list-disc list-inside space-y-2 mt-3 text-gray-900 dark:text-gray-300">
                        <li>
                            Users <strong>cannot permanently delete</strong> their data, as records must be kept for club activities.
                        </li>
                        <li>
                            If a member leaves the club, their <strong>account will be suspended</strong> and only visible to authorized admins.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-black dark:text-gray-200 mb-3">
                        4. Contact Information
                    </h2>
                    <p className="text-gray-900 dark:text-gray-300">
                        If you have any questions about our Privacy Policy, please contact us.
                    </p>
                </section>
            </div>
        </>
    );
};