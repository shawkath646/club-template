import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function NoPermission() {
    return (
        <section className="flex items-center justify-center min-h-[700px]">
            <div className="space-y-6">
                <FaLock size={40} className="mx-auto" />
                <h1 className="text-3xl font-bold">You do not have permission to view this page</h1>
                <p className="text-lg">It looks like you don't have the required permissions to access this content.</p>
                <Link href="/" className="block w-fit mx-auto px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Go Home
                </Link>
            </div>
        </section>
    );
}