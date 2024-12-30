"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { formatDate } from '@/utils/utils.frontend';
import { NoticeType } from "@/types";


export default function NoticeCard({ data }: { data: NoticeType }) {
    return (
        <Disclosure>
            <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg mb-4">
                <div className="flex justify-between items-center">
                    {/* Title */}
                    <h2 className="text-lg font-semibold text-white">{data.title}</h2>

                    {/* Delete Button */}
                    <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                    >
                        Delete
                    </button>
                </div>

                {/* Timestamp */}
                <div className="text-xs text-gray-400 mb-2">{formatDate(data.timestamp, { isTime: true })}</div>

                {/* Description */}
                <DisclosureButton className="w-full text-left text-gray-300">
                    {data.description.length > 100
                        ? data.description.substring(0, 100) + '...'
                        : data.description}
                </DisclosureButton>

                <DisclosurePanel className="text-gray-400 mt-2">
                    {data.description}
                </DisclosurePanel>

                {data.attachment && (
                    <div className="mt-2 text-sm text-gray-400 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 18.75L9 12.75M9 12.75V6.75M9 12.75l6 6M12 15.75l6-6M18 9.75h-6M18 9.75V6M18 9.75l-6-6"
                            />
                        </svg>
                        Attachment available
                    </div>
                )}

                {data.isImportant && (
                    <span className="mt-3 inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Important
                    </span>
                )}
            </div>
        </Disclosure>
    );
};
