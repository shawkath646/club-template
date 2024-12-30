import { headers } from 'next/headers';
import Link from "next/link";
import Image from "next/image";
import { capitalizeWords } from "@/utils/utils.frontend";
import { MemberPartialProfileType } from "@/types";
import { MdEmail } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";

export default async function MemberCard({ data }: { data: MemberPartialProfileType }) {

    const headersList = await headers();
    const currentURL = headersList.get("referer") || '';
    const encodedURL = encodeURIComponent(currentURL);

    return (
        <article className="bg-white/20 dark:bg-gray-800/20 rounded-lg shadow-lg p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex space-x-6">
                <Image
                    src={data.personal.picture || `https://eu.ui-avatars.com/api/?name=${data.personal.fullName}&size=120`}
                    alt={`${data.personal.fullName} profile`}
                    height={128}
                    width={128}
                    className="rounded-md object-cover shadow-md w-32 h-32"
                />
                <div className="flex-1">
                    {data.club.status === "approved" ? (
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            NBC ID:{" "}
                            <span className="font-semibold">{data.club.nbcId}</span>
                        </p>
                    ) : (
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Application ID:{" "}
                            <span className="font-semibold">{data.id}</span>
                        </p>
                    )}

                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2 line-clamp-1">
                        {data.personal.fullName}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                        <FaUniversity className="mr-2 text-blue-500 dark:text-blue-400" />
                        <p className="flex-1 line-clamp-1">{data.educational.institute}</p>
                    </div>

                    <Link
                        href={`mailto:${data.identification.email}`}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2"
                    >
                        <MdEmail className="mr-2 text-blue-500 dark:text-blue-400" />
                        <p className="flex-1 line-clamp-1">{data.identification.email}</p>
                    </Link>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Position:{" "}
                    <span className="font-semibold text-emerald-500">
                        {capitalizeWords(data.club.position.join(", "))}
                    </span>
                </p>
            </div>
            <Link
                href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members/profile?id=${data.id}&callbackUrl=${encodedURL}`}
                className="block mt-6 text-center text-white bg-blue-500/60 dark:bg-blue-600/60 hover:bg-blue-600 dark:hover:bg-blue-700 py-2 px-4 w-full rounded-lg font-semibold text-sm shadow-md transition-colors"
            >
                View Profile
            </Link>
        </article>
    );
}
