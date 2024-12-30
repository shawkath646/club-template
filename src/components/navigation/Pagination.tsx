import Link from "next/link";

export default function Pagination({ URLPrefix, maximumPage, currentPage }: { URLPrefix: string, maximumPage: number, currentPage: number }) {
    return (
        <section className="flex items-center justify-center gap-2 py-4 flex-wrap mt-5">
            <Link
                href={URLPrefix + 1}
                className={`px-3 py-1 rounded-full border ${currentPage === 1
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 text-gray-600 hover:bg-blue-500/30 hover:text-white"} 
            transition-transform transform hover:scale-105`}
            >
                1
            </Link>

            {currentPage > 3 && <span className="px-3 py-1 text-gray-400">...</span>}

            {currentPage > 2 && (
                <Link
                    href={URLPrefix + (currentPage - 1)}
                    className={`px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-500/30 hover:text-white transition-transform transform hover:scale-105`}
                >
                    {currentPage - 1}
                </Link>
            )}

            {currentPage !== 1 && currentPage !== maximumPage && (
                <Link
                    href={URLPrefix + currentPage}
                    className="px-3 py-1 rounded-full border border-blue-500 bg-blue-500 text-white transition-transform transform hover:scale-105"
                >
                    {currentPage}
                </Link>
            )}

            {currentPage < maximumPage - 1 && (
                <Link
                    href={URLPrefix + (currentPage + 1)}
                    className={`px-3 py-1 rounded-full border border-gray-300 text-gray-600 hover:bg-blue-500/30 hover:text-white transition-transform transform hover:scale-105`}
                >
                    {currentPage + 1}
                </Link>
            )}

            {currentPage < maximumPage - 2 && <span className="px-3 py-1 text-gray-400">...</span>}

            {maximumPage > 1 && (
                <Link
                    href={URLPrefix + maximumPage}
                    className={`px-3 py-1 rounded-full border ${currentPage === maximumPage
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 text-gray-600 hover:bg-blue-500/30 hover:text-white"} 
                transition-transform transform hover:scale-105`}
                >
                    {maximumPage}
                </Link>
            )}
        </section>
    );
}