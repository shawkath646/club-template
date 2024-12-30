import Link from "next/link";
import Image from "next/image";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import dynamicBoxImage1 from "@/assets/DynamicBox/copy-92.png";
import dynamicBoxImage2 from "@/assets/DynamicBox/Screenshot (23).png";

export default async function DynamicBox() {
    return (
        <section className="grid lg:grid-cols-2 gap-5">
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 bg-opacity-75 dark:bg-opacity-75 p-4 rounded-lg shadow-lg max-w-xl mx-auto mt-10">
                <div className="flex flex-col lg:flex-row items-center mb-4">
                    <div className="lg:w-2/3 lg:pr-4">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 lg:mb-0">
                            Meet our newly reformed committee.
                        </h2>
                        <p className="my-4">
                            Our club's committee has been upgraded with existing members in newly defined roles. Visit the members page for more details.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3 lg:pl-4 mt-4 lg:mt-0 relative h-48">
                        <Image
                            src={dynamicBoxImage2}
                            alt="Flood in Bangladesh"
                            fill
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </div>
                </div>
                <Link
                    href="/members"
                    className="flex w-fit mx-auto items-center space-x-2 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
                >
                    <p>Visit</p>
                    <FaArrowRightLong size={17} />
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 bg-opacity-75 dark:bg-opacity-75 p-4 rounded-lg shadow-lg mt-10 mx-auto max-w-xl">
                <div className="flex flex-col lg:flex-row items-center mb-4">
                    <div className="lg:w-2/3 lg:pr-4">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 lg:mb-0">
                            Flood Causes in Bangladesh (Brahmonbaria, Feni, Cumilla) Due to Opened Dams in India
                        </h2>
                        <p className="my-4">
                            Your small donation can help those affected by the flood.
                        </p>
                    </div>

                    <div className="w-full lg:w-1/3 lg:pl-4 mt-4 lg:mt-0 relative h-48">
                        <Image
                            src={dynamicBoxImage1}
                            alt="Flood in Bangladesh"
                            fill
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </div>
                </div>
                <Link
                    href="/donation"
                    className="flex w-fit mx-auto items-center space-x-2 bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
                >
                    <p>Donate Now</p>
                    <BiSolidDonateHeart size={20} />
                </Link>
            </div>
        </section>
    );
}