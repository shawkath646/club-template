import { Metadata } from 'next';
import Link from 'next/link';
import { FaUser, FaBlog, FaTasks, FaDonate, FaClipboardList, FaHistory } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';

export const metadata: Metadata = {
    title: "Admin Tools"
};

export default async function Page() {

    const tools = [
        { name: 'Notice Board', icon: <FaClipboardList size={28} />, href: "/admin-tools/notice-board" },
        { name: 'Blogs', icon: <FaBlog size={28} />, href: "/admin-tools/blogs" },
        { name: 'Documents', icon: <HiDocumentText size={28} />, href: "/admin-tools/documents" },
        { name: 'Members', icon: <FaUser size={28} />, href: "/admin-tools/members" },
        { name: 'Tasks', icon: <FaTasks size={28} />, href: "/admin-tools/tasks" },
        { name: 'Donation', icon: <FaDonate size={28} />, href: "/admin-tools/donation" },
        { name: 'History', icon: <FaHistory size={28} />, href: "/admin-tools/history" },
    ];

    return (
        <>
            <h1 className="text-4xl font-bold text-center text-black dark:text-gray-200 mb-12">
                Admin Tools
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                    <Link
                        key={index}
                        href={process.env.NEXT_PUBLIC_APP_BASE_URL + tool.href}
                        className="bg-white/20 dark:bg-gray-800/20 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center transform hover:scale-105 hover:bg-blue-100 dark:hover:bg-gray-700"
                    >
                        <div className="mb-4 text-blue-500 dark:text-blue-400">
                            {tool.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{tool.name}</h3>
                    </Link>
                ))}
            </div>
            <p className="text-sm text-gray-400 mt-10 text-center">Note: Please proceed carefully. All your actions will be recorded in the history tab, visible to other admins, and cannot be deleted.</p>
        </>
    );
};
