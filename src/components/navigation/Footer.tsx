import Link from "next/link";
import Image from "next/image";
import getClubInfo from "@/constant/getClubInfo";

export default async function Footer() {

    const clubInfo = await getClubInfo();
    const today = new Date();

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2">

                    <section>
                        <div className="flex items-center space-x-4">
                            <Image src={clubInfo.logo} alt={clubInfo.name + "logo"} height={48} width={48} className="h-12 w-12" />
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{clubInfo.name}</h1>
                        </div>

                        <nav className="flex space-x-6 mt-8">
                            <Link href="/sponsor" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                Be a Sponsor
                            </Link>
                            <Link href="/donate" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                Donate
                            </Link>
                            <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                Terms of Service
                            </Link>
                        </nav>
                    </section>

                    <div className="mt-6 sm:mt-0 flex flex-col space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">Phone:&nbsp;
                        <Link href={"tel:" + clubInfo.contacts.phoneNumber}>{clubInfo.contacts.phoneNumber}</Link>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">Email:&nbsp;
                            <Link href={"mailto:" + clubInfo.contacts.email}>{clubInfo.contacts.email}</Link>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-wrap">Address: {clubInfo.address}</p>
                        <Link href={clubInfo.social.facebookPage} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Follow us on Facebook
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6 flex flex-wrap justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Application developed by <Link target="_blank" href="https://cloudburstlab.vercel.app" className="text-blue-600 dark:text-blue-400 hover:underline">CloudBurst Lab</Link>
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
                        © 2022 - {today.getFullYear()} All rights reserved by {clubInfo.name}
                    </p>
                </div>
            </div>
        </footer>

    );
}