"use client";
import Image from "next/image";
import { useState } from "react";
import { MemberProfileType } from "@/types";

export default function NonMemberList({ preloadPendingMembers }: { preloadPendingMembers: MemberProfileType[] }) {

    const [pendingMemberList, setPendingMemberList] = useState(preloadPendingMembers);

    return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold text-blue-500 dark:text-blue-400 mb-4">New Requests</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {pendingMemberList.map((item, key) => (
                    <article key={key}>
                        <div className="flex space-x-4">
                            <Image src={item.personal.picture} alt={`${item.personal.fullName} profile`} height={300} width={260} />
                            <div>
                                <p>Full Name: {item.personal.fullName}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
