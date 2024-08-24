import Link from "next/link";
import Image from "next/image";
import headerLogo from "@/assets/headerLogo.png";

export default async function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2">

                    <section>
                        <div className="flex items-center space-x-4">
                            <Image src={headerLogo} alt="Narsingdi Biggan Club Logo" className="h-12 w-12" />
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                Narsingdi Biggan Club
                            </h1>
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
                        </nav>
                    </section>

                    <div className="mt-6 sm:mt-0 flex flex-col space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">Phone: +880 1234-567890</p>
                        <p className="text-gray-600 dark:text-gray-400">Email: info@narsingdibigganclub.com</p>
                        <p className="text-gray-600 dark:text-gray-400">Address: West Brahmondi, Narsingdi Sadar - 1601,<br />Narsingdi, Dhaka, Bangladesh</p>
                        <Link href="https://facebook.com/narsingdibigganclub" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Follow us on Facebook
                        </Link>
                    </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6 flex flex-wrap justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Application developed by <a href="https://cloudburstlab.vercel.app" className="text-blue-600 dark:text-blue-400 hover:underline">CloudBurst Lab</a>
                    </p>

                    {/* Copyright */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
                        © 2022 - 2024 All rights reserved by Narsingdi Biggan Club
                    </p>
                </div>
            </div>
        </footer>

    );
}