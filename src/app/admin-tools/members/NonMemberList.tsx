"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MemberProfileType } from "@/types";
import { MdEmail } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";


export default function NonMemberList({ preloadPendingMembers }: { preloadPendingMembers: MemberProfileType[] }) {

    const [pendingMemberList, setPendingMemberList] = useState(preloadPendingMembers);

    return (
        <section className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-400 mb-6">
                New Requests
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {pendingMemberList.map((item, key) => (
                    <article
                        key={key}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between"
                    >
                        <div className="flex space-x-6">
                            <Image
                                src={item.personal.picture}
                                alt={`${item.personal.fullName} profile`}
                                height={120}
                                width={120}
                                className="rounded-md object-cover shadow-md w-32 h-32"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                    Application ID:{" "}
                                    <span className="font-semibold">{item.club.tempID}</span>
                                </p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
                                    {item.personal.fullName}
                                </p>
                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2 truncate">
                                    <FaUniversity className="mr-2 text-blue-500 dark:text-blue-400" />
                                    <span>{item.educational.institute}</span>
                                </div>

                                <Link href={`mailto:${item.identification.email}`} className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2 truncate">
                                    <MdEmail className="mr-2 text-blue-500 dark:text-blue-400" />
                                    <span>{item.identification.email}</span>
                                </Link>
                            </div>
                        </div>
                        {/* Information below the image */}
                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Requesting Position:{" "}
                                <span className="font-semibold">{item.club.position}</span>
                            </p>
                        </div>
                        <Link
                            href={`${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin-tools/members/${item.id}`}
                            className="block mt-6 text-center text-white bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 py-2 px-4 w-full rounded-lg font-semibold text-sm shadow-md transition-colors"
                        >
                            View Application
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};
