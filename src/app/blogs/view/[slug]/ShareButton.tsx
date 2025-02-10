"use client";
import { FiShare2 } from "react-icons/fi";

export default function ShareButton({ url }: { url: string }) {

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard! ✅");
    };

    return (
        <button type="button" onClick={handleCopy} className="flex items-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 focus:ring-purple-500 py-1 px-3 font-medium text-white dark:text-gray-200 focus:ring-2 focus:ring-offset-2 rounded-lg shadow-md transform hover:scale-105 focus:scale-105 transition-all duration-300 ease-out">
            <p>Share</p>
            <FiShare2 className="ml-1" />
        </button>
    );
}
