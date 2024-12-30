import Image from "next/image";
import { capitalizeWords } from "@/utils/utils.frontend";
import { MemberPublicPartialProfileType } from "@/types";
import { FaUniversity } from "react-icons/fa";

export default function MemberCard({ data }: { data: MemberPublicPartialProfileType }) {
    return (
        <article className="bg-white/20 dark:bg-gray-800/20 rounded-lg shadow-lg p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex space-x-6">
                <Image
                    src={data.personal.picture || `https://eu.ui-avatars.com/api/?name=${data.personal.fullName}&size=120`}
                    alt={`${data.personal.fullName} profile`}
                    height={128}
                    width={128}
                    className="rounded-lg object-cover shadow-lg w-32 h-32"
                />
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        NBC ID:{" "}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {data.club.nbcId}
                        </span>
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2 line-clamp-1">
                        {data.personal.fullName}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <FaUniversity className="mr-2 text-blue-600 dark:text-blue-400" />
                        <p className="flex-1 line-clamp-1">{data.educational.institute}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
                        Present Class:{" "}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {data.educational.presentClass}
                        </span>
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">
                        Interested In:{" "}
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {data.club.interestedIn}
                        </span>
                    </p>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 whitespace-nowrap truncate">
                Position:{" "}
                <span className="font-semibold text-emerald-500">
                    {data.club.position
                        .map(item => capitalizeWords(item))
                        .join(", ")}
                </span>
            </p>
        </article>
    );
}
